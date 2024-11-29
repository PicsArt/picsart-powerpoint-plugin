import React, { useEffect, useRef, useState } from "react";
import { NO_VALID_KEY } from "@constants/errorMessages";
import { isValidKey, saveApiKey } from "@helpers/index";
import { GET_API_KEY_URL } from "@constants/url";
import "./styles.scss"

const closeIcon = "assets/icons/close.svg";

interface ChangeAPIkeyModalProps {
  handleClose : () => void;
}

const ChangeAPIkeyModal : React.FC<ChangeAPIkeyModalProps> = ({ handleClose }) => {
  const [value, setValue ] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const selectorRef = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    const newValue = event.target.value;
    setValue(newValue);
    setMessagesAsDefault();
  };

  const setMessagesAsDefault = () => {
    setWarning('');
    setError('');
    setSuccess('')
  }

  const handleClickOutside = (event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      handleClose();
    }
  };

  const checkKey = async () => {
    setMessagesAsDefault();
    try {
        if (value) {
            const isValid = await isValidKey(value); 
            if (isValid) {
                saveApiKey(value);
                setSuccess("API Key Set successfully");
            } else {
                setError(NO_VALID_KEY);
            }
        }
        else {
            setWarning('Please Fill Input')
        }

    } catch (error) {
        setError(error);
    } 
  }
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 return (
    <div className="change-api-key-modal">
        <div ref={selectorRef} className="modal-container">
            <div className="close-container">
                <img onClick={handleClose} className="close-icon" src={closeIcon} alt="Close Icon" />
            </div>
            <h1>Enter your Picsart API Key</h1>
            <div className="input-container">
                <input value={value} onChange={handleInputChange} placeholder="API Key" type="text" name="key" className="keyset-input"/>
                { warning && <span className="warning-text">{ warning }</span>}
                { error && <span className="error-text">{ error }</span>}
                { success && <span className="success-text">{ success }</span>}
                <button onClick={checkKey} className="submit"> Submit </button>
                <a className="get-key" href={GET_API_KEY_URL}>Get your Picsart API Key</a>
            </div>
        </div>
    </div>
  )
}

export default ChangeAPIkeyModal;