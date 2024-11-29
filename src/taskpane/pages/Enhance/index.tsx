import React, { useEffect, useState } from 'react';
import { FACTOR_ACTION_NAME, SELECTORS } from './constants';
import { Selector, LoadingSpinner, UploadBox, StartProcessingBtn, Toast } from '@ui/index';
import { extractBytesFromFile, processImageAndDraw } from '@utils/ImageProcessor';
import { makeFormAndURLForUpscale } from '@utils/RequestWrappers';
import { getApiKey } from "@helpers/index";
import { TOKEN_ERR } from '@constants/errorCodes';
import "./styles.scss"

const Enhance: React.FC<PageProps> = ({  handleUpdateBalance }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>();
  const [actionAccumulator, setActionAccumulator] = useState<Action[]>([]);
  const [error, setError] = useState<string>('');

  const addActiontoAccum = (action : Action) =>  {
    setActionAccumulator([...actionAccumulator, action]);
  }

  const handleFileSelect = (url : string, previewFile : File) : void => {
    setFilePreviewUrl(url);
    setFile(previewFile);
  }

  const handleProcesing = async () => {
    if (!actionAccumulator.length) { return };
    if (!getApiKey()) {
        setError(TOKEN_ERR);
        return;
    }
    
    setLoading(true);
    const imageBytes = await extractBytesFromFile(file);
    
    let params = {};
    actionAccumulator.forEach((item) => {
      params[item.actionName] = item.value;
    }) 

    const formObj = await makeFormAndURLForUpscale(imageBytes, params);
    const response = await processImageAndDraw(formObj);
    if (!response.success) {
      setError(response.msg);
    }
    
    setLoading(false);
    handleUpdateBalance();
  }

  const is_filter_disabled = !filePreviewUrl; 
  const is_btn_disabled = (!filePreviewUrl || !actionAccumulator.some((item) => item.actionName == FACTOR_ACTION_NAME));

  useEffect(() => {
    let timeoutId;
    if (error) {
      timeoutId = setTimeout(() => {
        setError('');
      }, 3000)
    }
    return () => { clearTimeout(timeoutId) }; 
  }, [error])

  return (
    <div className='upscale-container'>
      { loading && <LoadingSpinner /> }
      { error && <Toast text={error} type="error" /> }
      <h2>Take the work out of getting sizing right. Allow users to upload images of any size without loss to photo quality.</h2>
      <UploadBox handleFileSelect={handleFileSelect} />
      { SELECTORS.map((selector, index) => {
        const { actionName, text, options } = selector;
        return ( 
          <Selector 
            key={index}
            disabled={is_filter_disabled}
            actionName={actionName}
            text={text}
            options={options}
            addActiontoAccum={addActiontoAccum}
          /> )
      })}
      <StartProcessingBtn disabled={is_btn_disabled} handleProcesing={handleProcesing}/>
    </div>
  );
};

export default React.memo(Enhance);