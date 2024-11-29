// Toast Component with close icon
import React, { useEffect, useState } from "react";
import './styles.scss'

interface ToastProps {
  text: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
}

let colors = {
  'success' : '#158423',
  'error' : '#D31E2A',
  'warning' : '#FE9D24',
}

const Toast: React.FC<ToastProps> = ({ text, type, duration = 3000 }) => {
  const iconPath = `/assets/icons/${type}.svg`;
  const toastClass = type === 'success' ? 'success' : type === 'error' ? 'error' : 'warning';

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [closeCLass, setCloseClass] = useState<boolean>(false);

  const handleClose = () => {
    setCloseClass(true);
    setTimeout(() => {
        setIsVisible(false);
    }, 500);
  };

  useEffect(() => {
    const classTimer = setTimeout(() => {
        setCloseClass(true);
    }, duration - 500);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () =>  {
        clearTimeout(classTimer);
        clearTimeout(timer);
    }
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={`toast-container toast-container-${toastClass}  ${closeCLass ? 'close-toast' : ''} `}>
      <div className="nested-container">
        <div className="icon-container">
            <img src={iconPath} alt={`${type} icon`} />
        </div>
        <div className="text-container">
            <span className="text">{text}</span>
        </div>
        <div className="close-container" onClick={handleClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill={`${colors[type]}`} xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7 6.29289L12.6464 0.646447C12.8417 0.451184 13.1583 0.451184 13.3536 0.646447C13.5488 0.841709 13.5488 1.15829 13.3536 1.35355L7.70711 7L13.3536 12.6464C13.5488 12.8417 13.5488 13.1583 13.3536 13.3536C13.1583 13.5488 12.8417 13.5488 12.6464 13.3536L7 7.70711L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" fill={`${colors[type]}`}/>
            </svg>
        </div>
      </div>
    </div>
  );
};

export default Toast;
