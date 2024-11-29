import React, { useState, useRef, useEffect } from 'react';
import './styles.scss';

const ArrowRight = 'assets/icons/arrow-right.svg';
const ArrowDown = 'assets/icons/arrow-down.svg';

interface SelectorProps {
    addActiontoAccum: (arg1: Action) => void
    actionName : string;
    text: string;
    options: string[];
    disabled : boolean;
}

const Selector : React.FC<SelectorProps> = ({ addActiontoAccum, actionName, text, options, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(text);
  const selectorRef = useRef(null);

  const toggleOpen = () => {
    if (disabled) { return };
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option : string) => {
    setSelectedOption(option);
    setIsOpen(false);
    addActiontoAccum({ actionName , value: option });
  };

  const handleClickOutside = (event : MouseEvent) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`selector  ${disabled ? "disabled-selector" : ''}`} onClick={toggleOpen} ref={selectorRef}>
        <div className="label">
            <span>{selectedOption}</span>
            <img src={isOpen ? ArrowDown : ArrowRight} alt="Toggle Icon" className="icon" />
        </div>
        {isOpen && (
            <div className="options">
            {options.map((option, index) => (
                <div 
                  key={index} 
                  className="option" 
                  onClick={() => handleOptionClick(option)}
                >
                {option}
                </div>
            ))}
            </div>
        )}
    </div>
  );
};

export default React.memo(Selector);
