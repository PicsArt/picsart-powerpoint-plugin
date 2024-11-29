import React, { useCallback, useEffect, useState } from "react";
import Slider from "@ui/Slider";
import Hue from "@uiw/react-color-hue";
import useDebounce from "@hooks/useDebounce";
import { hexToHsva, hsvaToHex } from "@uiw/color-convert";
import { STROKE_COLOR_ACTION_NAME, STROKE_OPACITY_ACTION_NAME, STROKE_SIZE_ACTION_NAME } from "@pages/RemoveBg/constants";
import "./styles.scss";

interface StrokeProps {
    addActiontoAccum: (arg1: Action) => void;
    removeActionFromAccum: (arg1: RemoveAction) => void;
    disabled: boolean;
}

interface HsvColor {
    h: number;
    s: number;
    v: number;
}

interface HsvaColor extends HsvColor {
    a: number;
}

const Stroke: React.FC<StrokeProps> = ({ addActiontoAccum, disabled}) => {
    const [sizeValue, setSizeValue] = useState<number>(0);
    const [opacityValue, setOpacityValue] = useState<number>(0);
    const [clicked, setClicked] = useState<boolean>(false);
    const [hsva, setHsva] = useState<HsvaColor>(hexToHsva("#07C4CC"));
    const [hex, setHex] = useState<string>(hsvaToHex(hsva));

    const debouncedSizeValue = useDebounce(sizeValue, 500);  
    const debouncedOpacityValue = useDebounce(opacityValue, 500);
    const debouncedHex = useDebounce(hex, 500); 
    
    const handleOnClick = () => {
        if (disabled) return;
        setClicked((prev) => !prev);
    }

    const addAction = useCallback((actionName : string, value : string) => {
        addActiontoAccum({ actionName : actionName , value })
    }, []);
    
    const handleSizeSliderChange = useCallback((val : number) => {
        setSizeValue(val);
    }, []);
    
    const handleOpacitySliderChange = useCallback((val : number) => {
        setOpacityValue(val);
    }, []);
    
    const hsvaChange = useCallback((newHsva : HsvaColor) => {
        setHsva(newHsva);
        const newHex = hsvaToHex(newHsva);
        setHex(newHex);
    }, [hsvaToHex]);
    
    const handleHsvaChange = useCallback((newHue : HsvaColor) => {
        hsvaChange({ ...hsva, ...newHue });
    }, []);

    useEffect(() => {
        if (debouncedSizeValue !== undefined) {
          addAction(STROKE_SIZE_ACTION_NAME, debouncedSizeValue.toString());
        }
    }, [debouncedSizeValue]);
    
    useEffect(() => {
        if (debouncedOpacityValue !== undefined) {
            addAction(STROKE_OPACITY_ACTION_NAME, debouncedOpacityValue.toString());
        }
    }, [debouncedOpacityValue]);
    
    useEffect(() => {
        if (debouncedHex !== undefined) {
            addAction(STROKE_COLOR_ACTION_NAME, hex)
        }
    }, [debouncedHex]);
    
    return (
        <div className={`stroke-filter ${disabled ? 'disabled-picker': ''}`}>
            <div className={`input-filter ${clicked ? 'clicked' : ''}`} onClick={handleOnClick}>
                <span>Stroke</span>
                <img className={`icon`} src={`assets/icons/${clicked ? 'minus.svg' : 'plus.svg'}`} />
            </div>
            { clicked && (
                <div className="hide-content-container">
                    <div className="filter-container">
                        <span className="property">Color</span>
                        <div className="color-slider">
                            <Hue hue={hsva.h} onChange={handleHsvaChange}
                            />
                        </div>
                        <div className="color-value-container">
                            <div className="color-container">
                                <div className="colored-div" style={{ background: hex}}></div>
                                <span className="hex-value">{ hex.slice(1) }</span>
                            </div>
                            <div className="value-container">
                                <span className="value">100%</span>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container"> 
                        <span className="property">Size</span>
                        <div className="slider">
                            <Slider value={sizeValue} onChange={handleSizeSliderChange} />
                        </div>
                        <div className="value-container">
                            <span className="value">{ sizeValue }</span>
                        </div>
                        
                    </div>
                    <div className="filter-container"> 
                        <span className="property">Opacity</span>
                        <div className="slider">
                            <Slider value={opacityValue} onChange={handleOpacitySliderChange} />
                        </div>
                        <div className="value-container">
                            <span className="value">{`${opacityValue}% ` }</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(Stroke);