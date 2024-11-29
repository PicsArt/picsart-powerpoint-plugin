import React from 'react';
import './styles.scss';

interface StartProcessingBtnProps {
    handleProcesing : () => void;
    disabled: boolean; 
}

const StartProcessingBtn: React.FC<StartProcessingBtnProps> = ({ handleProcesing, disabled }) => {
  const handleClcik = () : void => {
    if (!disabled) {
        handleProcesing();
    } else {
    }
  };
  return (
    <div onClick={handleClcik} className={`start-processing-btn flex-col g-10 `} >
        <button className={`${disabled ? 'disabled': 'keyset-btn'}`} type='button'> Start Proccesing </button>
    </div>
  );
};

export default StartProcessingBtn;