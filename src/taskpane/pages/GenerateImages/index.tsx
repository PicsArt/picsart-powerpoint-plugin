import React, { useEffect, useState } from "react";
import { LoadingSpinner, Toast } from "@ui/index";
import { getSelectedText } from "@taskpane/taskpane";
import { drawImageFromUrlOnSlide } from "@utils/ImageProcessor";
import { TOKEN_ERR } from "@constants/errorCodes";
import { getApiKey } from "@helpers/index";
import { getImagesFromText } from "@api/index";
import "./styles.scss"

const searchIcon = 'assets/icons/search.svg';

const GenerateImages: React.FC<PageProps> = ({ handleUpdateBalance }) => {
  const [warning, setWarning] = useState<string>('');
  const [inputText, setInputText] = useState<string>(''); 
  const [images, setImages] = useState<Array<{ id: string; url: string; status: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!getApiKey()) {
      setError(TOKEN_ERR);
      return;
    }

    if (!inputText) {
      setWarning("Please provide text");
      return;
    }
    setLoading(true); 
    setImages([]); 

    try {
      const result = await getImagesFromText(inputText) as Array<{id: string; url: string; status: string}>;
      const doneImages = result.filter((image: { status: string }) => image.status === "DONE");
      setImages(doneImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); 
      handleUpdateBalance()
    }
  };

  const handleImageClick = async (imgUrl : string) => {
    await drawImageFromUrlOnSlide(imgUrl);
  }

  useEffect(() => {
    const checkAndGetSelectedText = async () => {
      const res = await getSelectedText();
      if (res.status) {
        setInputText(res.text);
      }
    }

    Office.context.document.addHandlerAsync(
      Office.EventType.DocumentSelectionChanged,
      checkAndGetSelectedText,
      (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          console.error("Error adding selection change handler:", result.error.message);
        } 
      }
    );

    checkAndGetSelectedText();
  }, [])

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
    <div className={`generate-images-container ${!images.length ? 'margin-top-minus-100' : ''}`}>
      { loading && <LoadingSpinner /> }
      { error && <Toast text={error} type="error" /> }
      <div className="pre-results">
        <textarea
          className="textarea" 
          placeholder="Enter text here..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} 
        />
        <div className="search-btn-contianer">
          { warning && <span className="warning-text">{ warning }</span>}
          <button onClick={handleSubmit} className='search-btn' type='button'> 
            Generate 
            <img width={15} height={15} className="close-icon" src={searchIcon} alt="Search Icon" />
          </button>
        </div>
        {images?.length ? ( <p className="title">Generated images:</p> ) : ''}
      </div>

      {images?.length ? (
        <div className="results-container">
          {images.map((image, index) => (
            <div onClick={() => handleImageClick(image.url) } key={index} className="image-wrapper">
              <img src={image.url} alt={`Image ${index + 1}`} className="image" />
            </div>
          ))}
        </div>
      ) : ''}
    </div>
  );
};

export default React.memo(GenerateImages);