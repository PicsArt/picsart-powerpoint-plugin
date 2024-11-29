import React, { useEffect, useState } from "react";
import Hue from "@uiw/react-color-hue";
import { HexColorPicker } from "react-colorful";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert"; // Use both functions
import "./styles.scss";

const pickerIcon = 'assets/icons/picker.svg';

interface HsvColor {
    h: number;
    s: number;
    v: number;
}
interface HsvaColor extends HsvColor {
    a: number;
}

interface ColorPickerProps {
    setColor : (arg1 : string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setColor }) => {
  const [hsva, setHsva] = useState<HsvaColor>(hexToHsva("#07C4CC"));
  const [hex, setHex] = useState<string>(hsvaToHex(hsva));

  const handleHsvaChange = (newHsva : HsvaColor) => {
    setHsva(newHsva);
    const newHex = hsvaToHex(newHsva);
    setHex(newHex);
  };

  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    const newHsva = hexToHsva(newHex);
    setHsva(newHsva);
    setColor(newHex);
  };

  useEffect(() => {
    setColor(hex);
  }, [])

  return (
    <div className="color-picker-container">
      <HexColorPicker
        color={hex}
        onChange={handleHexChange}
      />

      <div className="slider-container">
        <div className="icon-container">
            <img className="icon" width={21} height={21} src={pickerIcon} alt="Picker" />
        </div>
        <div className="color-slider">
            <Hue
            hue={hsva.h}
            onChange={(newHue) => {
                handleHsvaChange({ ...hsva, ...newHue });
            }}
            />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
