import React from "react";
import "./styles.scss"

const wifiIcon = "/assets/icons/wifi.svg";

const InternetConnection : React.FC = () => {
 return (
    <div className="internet-connection-modal">
        <div className="modal-container">
            <div className="icon-container">
                <img src={wifiIcon} alt="Wifi icon" />
            </div>
            <span className="title"> Connect to Internet </span>
            <span className="subtitle"> Check your Internet connection and retry. </span>
            <button className="retry">Retry</button>
        </div>
    </div>
  )
}

export default InternetConnection;