import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UploadBox, StartProcessingBtn, LoadingSpinner, Stroke, Shadow, Selector, Toast } from '@ui/index';
import { extractBytesFromFile, processImageAndDraw } from '@utils/ImageProcessor';
import { MAKE_TRANSPARENT_ACTION_NAME, SELECTORS } from './constants';
import { TOKEN_ERR } from '@constants/errorCodes';
import { getApiKey } from '@helpers/index';
import { makeFormAndURLForRemoveBackground } from '@utils/RequestWrappers';
import './styles.scss'

interface RemoveBgProps {
  handleUpdateBalance: () => void;
}

const RemoveBg: React.FC<RemoveBgProps> = ({ handleUpdateBalance }) => {
  const [loading, setLoading ] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>();
  const [actionAccumulator, setActionAccumulator] = useState<Action[]>([]);
  const [error, setError] = useState<string>('');

  const addActiontoAccum = useCallback((action : Action) =>  {
    const actionExists = actionAccumulator.some(element => element.actionName === action.actionName);
  
    if (actionExists) {
      setActionAccumulator(prevState =>
        prevState.map(element =>
          element.actionName === action.actionName ? { ...element, value: action.value } : element
        )
      );
    } else {
      setActionAccumulator(prevState => [...prevState, action]);
    }
  }, [])

  const removeActionFromAccum = useCallback((action : RemoveAction) =>  {
    setActionAccumulator(actionAccumulator.filter((item) => item.actionName != action.actionName))
  }, [])

  const handleFileSelect = (url : string, previewFile : File) : void => {
    setFilePreviewUrl(url);
    setFile(previewFile);
  }

  const handleProcesing = useCallback(async () => {
    if (!getApiKey()) {
      setError(TOKEN_ERR);
      return;
    }
    
    setLoading(true);
    const imageBytes = await extractBytesFromFile(file);
    const formObj = await makeFormAndURLForRemoveBackground(actionAccumulator, imageBytes);
    const response = await processImageAndDraw(formObj);
    if (!response.success) {
      setError(response.msg);
    }
    
    handleUpdateBalance();
    setLoading(false);
  }, [actionAccumulator, file])
  
  useEffect(() => {
    let timeoutId : NodeJS.Timeout;
    if (error) {
      timeoutId = setTimeout(() => {
        setError('');
      }, 3000)
    }
    return () => { clearTimeout(timeoutId) }; 
  }, [actionAccumulator, file, error])
  
  const selectors = useMemo(() => SELECTORS.map((selector, index) => {
    return ( 
      <Selector 
        key={index}
        disabled={picker_disabled}
        addActiontoAccum={addActiontoAccum}
        {...selector}
      /> 
    )
  }), [file, actionAccumulator])
      
  const is_make_transparent_selected = actionAccumulator.some(item => item.actionName == MAKE_TRANSPARENT_ACTION_NAME);
  const picker_disabled = !filePreviewUrl || is_make_transparent_selected;
  const btn_disabled = (!filePreviewUrl || !actionAccumulator.length);

  return (
    <div className={`remove-bg-container`}>
      { loading && <LoadingSpinner /> }
      { error && <Toast text={error} type="error" /> }
      <UploadBox handleFileSelect={handleFileSelect} />
      <div className={`input-filters-container`}>
        <Stroke disabled={picker_disabled} removeActionFromAccum={removeActionFromAccum} addActiontoAccum={addActiontoAccum} />
        <Shadow disabled={picker_disabled} removeActionFromAccum={removeActionFromAccum} addActiontoAccum={addActiontoAccum} />
        { selectors }
      </div>
      <StartProcessingBtn disabled={btn_disabled} handleProcesing={handleProcesing}/>
    </div>
  );
};

export default React.memo(RemoveBg);