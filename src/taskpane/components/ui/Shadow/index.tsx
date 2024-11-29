import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "@hooks/useDebounce";
import { SHADOW_BLUR_ACTION_NAME, SHADOW_OPACITY_ACTION_NAME } from "@pages/RemoveBg/constants";
import { Slider, Selector} from "@ui/index";
import "./styles.scss";

interface StrokeProps {
    addActiontoAccum: (arg1: Action) => void;
    removeActionFromAccum: (arg1: RemoveAction) => void;
    disabled: boolean;
}

const optionValues = [
    "disabled",
    "bottom-right", 
    "bottom", 
    "bottom-left", 
    "left", 
    "right", 
    "top-left", 
    "top", 
    "top-right"
];

const Shadow: React.FC<StrokeProps> = ({ addActiontoAccum, disabled}) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [blurVal, setBlurVal] = useState<number>(0);
    const [opacityVal, setOpacityVal] = useState<number>(0);

    const debouncedBlurVal = useDebounce(blurVal, 500);
    const debouncedOpacityVal = useDebounce(opacityVal, 500);

    const addAction = useCallback((actionName : string, value : string) => {
        addActiontoAccum({ actionName : actionName , value })
    }, [addActiontoAccum])

    const handleOnClick = () => {
        if (disabled) return;
        setClicked((prev) => !prev);
    } 

    const handleBlurSliderChange = useCallback((val : number) => {
        setBlurVal(val);
    }, []);
    
    const handleOpacitySliderChange = useCallback((val : number) => {
        setOpacityVal(val);
    }, []);

    useEffect(() => {
        if (debouncedBlurVal !== undefined) {
            addAction(SHADOW_BLUR_ACTION_NAME, blurVal.toString())
        }
    }, [debouncedBlurVal])

    useEffect(() => {
        if (debouncedOpacityVal !== undefined) {
            addAction(SHADOW_OPACITY_ACTION_NAME, opacityVal.toString())
        }
    }, [debouncedOpacityVal])
    
    return (
        <div className={`shadow-filter ${disabled ? 'disabled-picker': ''}`}>
            <div className={`input-filter ${clicked ? 'clicked' : ''}`} onClick={handleOnClick}>
                <span>Shadow</span>
                <img className={`icon`} src={`assets/icons/${clicked ? 'minus.svg' : 'plus.svg'}`} />
            </div>
            { clicked && (
                <>
                    <Selector 
                        disabled={false}
                        actionName={"shadow"}
                        text={"Custom"}
                        options={optionValues}
                        addActiontoAccum={addActiontoAccum}
                    /> 
                    <div className="hide-content-container">
                        <div className="filter-container"> 
                            <span className="property">Blur</span>
                            <div className="slider">
                                <Slider value={blurVal} onChange={handleBlurSliderChange} />
                            </div>
                            <div className="value-container">
                                <span className="value">{ blurVal }</span>
                            </div>
                            
                        </div>
                        <div className="filter-container"> 
                            <span className="property">Opacity</span>
                            <div className="slider">
                                <Slider value={opacityVal} onChange={handleOpacitySliderChange} />
                            </div>
                            <div className="value-container">
                                <span className="value">{`${opacityVal}% ` }</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(Shadow);