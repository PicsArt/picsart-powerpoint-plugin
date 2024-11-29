import React from "react";
import "./styles.scss";
const logo = "assets/icons/spining-logo.svg";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <div className="icon-container">
        <img className="icon" src={logo} alt="Loading Icon" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
