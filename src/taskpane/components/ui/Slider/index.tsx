import React, { useState } from 'react';
import './styles.scss';

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min = 0, max = 100, value = 50, onChange }) => {
  const [sizeValue, setSizeValue] = useState<number>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSizeValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
      <input
        type="range"
        min={min}
        max={max}
        value={sizeValue}
        onChange={handleChange}
        className="custom-slider"
        style={{
          background: `linear-gradient(
            to right,
            #E3E3F8 ${sizeValue}%,
            #CBCBCB ${sizeValue}%
          )`,
        }}
      />
  );
};

export default React.memo(Slider);
