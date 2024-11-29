import React, { useState } from "react";
import "./styles.scss";

interface InputProps {
  icon: string;
  text: string;
  extension: string;
}

const Input: React.FC<InputProps> = ({icon, extension, text }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  
  return (
    <div className="inside-remove-background-container">
      <div className="input-container" onClick={handleCopyToClipboard}>
        <img className="icon" src={`assets/icons/${icon}.${extension}`} alt="icon" />
        <span className="text">{ text }</span>
        {copied && <span className="copied-message">Copied!</span>}
      </div>
    </div>
  );
};

export default Input;
