import React, { useState } from "react";
import "./styles.scss";

const UploadIcon = "assets/icons/upload.svg"
interface UploadBoxProps {
  handleFileSelect : (arg1 : string, arg2 : File) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ handleFileSelect }) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFilePreview(url); 
      handleFileSelect(url, file);
    }
  };

  return (
    <div className={`upload-box ${filePreview ? 'remove-dashed-border' : ''}`}>
      <label className="upload-label">
        <input type="file" onChange={handleFileChange} className="file-input" />
        {filePreview ? (
          <img src={filePreview} alt="Uploaded preview" className="file-preview" />
        ) : (
          <>
            <span className="upload-text">Upload an Image</span>
            <img className="upload-icon" src={UploadIcon} alt="Upload Icon" />
          </>
        )}
      </label>
    </div>
  );
};

export default UploadBox;