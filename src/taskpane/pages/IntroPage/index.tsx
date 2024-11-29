import React, { useEffect, useState } from "react";
import { Image } from "@fluentui/react-components";
import { NO_VALID_KEY } from "@constants/errorMessages";
import { isValidKey, saveApiKey } from "@helpers/index";
import "./styles.scss";

const IntroImg = "assets/icons/intro.svg";
const title = "";

interface IntroPageProps {
  handleLoadMainContent : (arg1 : boolean) => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ handleLoadMainContent }) => {
  const [value, setValue ] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    const newValue = event.target.value;
    setValue(newValue);
  };
  
  const handleClcik = (event: React.MouseEvent<HTMLButtonElement>) : void => {
    event.preventDefault();
    if (value) {
      checkKey();
    }
  };
  
  const checkKey = async () => {
    try {
      const isValid = await isValidKey(value);
      if (isValid) {
        handleLoadMainContent(true);
        saveApiKey(value);
      }  else {
        setError(NO_VALID_KEY);
        handleLoadMainContent(false);
      }
    } catch (error) {
      setError(error);
    } 
  }

  useEffect(() => {
    if (value) {
      setDisabled(false);
      setError('');
    }
    else {
      setDisabled(true);
      setError('');
    } 
  }, [value])
  
  return (
    <div className="intro-page flex-col g-15">
      <div className="flex-col">
          <Image className="intro-img" src={IntroImg} alt={title} /> 
          <h2>Instantly remove the background from your images in just one click with our Remove Background API tool.</h2>
          <p className="keyset-text">1. To use the plugin, go to <a className="keyset-href" href="https://picsart.com/">Picsart.com </a> and create a free account.  </p> 
          <p className="keyset-text">2. Go to the <a className="keyset-href" href="https://picsart.com/"> API dashboard</a>, copy and past your API key here.  </p>
      </div>
      <div className="flex-col g-10" >
          <input value={value} onChange={handleInputChange} placeholder="API Key" type="text" name="key" className={`keyset-input ${error ? 'error-border' : ''}`}/>
          { error && <span className="error-text">{error}</span>}
          <button onClick={handleClcik} className={`keyset-btn ${disabled ? "disabled-btn" : ''}`} type="button"> Continue</button>
          <a className="key-learn-more" href="#">Learn about API key</a>
      </div>
    </div>
  );
};

export default IntroPage;