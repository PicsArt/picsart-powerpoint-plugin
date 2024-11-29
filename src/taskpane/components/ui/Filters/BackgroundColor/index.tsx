import React, { useEffect, useState } from "react";
import Input from "./Input";
import ColorPicker from "@ui/ColorPicker";
import { BACKGROUND_COLOR_ACTION_NAME } from "@pages/RemoveBg/constants";
import "./styles.scss";

interface BackgroundColorFilterProps {
    addActiontoAccum: (arg1: Action) => void;
    removeActionFromAccum: (arg1: RemoveAction) => void;
    disabled: boolean;
}

const BackgroundColorFilter: React.FC<BackgroundColorFilterProps> = ({ addActiontoAccum, disabled}) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [hexColor, setHexColor] = useState<string>('');

    const handleOnClick = () => {
        if (disabled) return;
        setClicked(!clicked);
    } 

    useEffect(() => {
        // if (clicked) {
            addActiontoAccum({actionName : BACKGROUND_COLOR_ACTION_NAME , value : hexColor})
        // } else {
        //     removeActionFromAccum({actionName : BACKGROUND_COLOR_ACTION_NAME})
        // }
    }, [hexColor])
    
    return (
        <div className={`background-color-filter ${disabled ? 'disabled-picker': ''}`}>
            <div className={`input-filter ${clicked ? 'clicked' : ''}`} onClick={handleOnClick}>
                <span>Background Color</span>
                <img className={`icon`} src={`assets/icons/${clicked ? 'minus.svg' : 'gradient.png'}`} />
            </div>
            { clicked && (
                <div className="hide-content-container">
                    <ColorPicker setColor={setHexColor} />
                    <Input icon={'hashtag'} extension={'svg'} text={hexColor.slice(1)} />
                </div>
            )}
        </div>
    );
};

export default BackgroundColorFilter;