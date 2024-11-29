import React, { useEffect, useState } from 'react';
import { MAKE_TRANSPARENT_ACTION_NAME } from '@taskpane/pages/RemoveBg/constants';
import './styles.scss';


interface MakeTransparentFilterProps {
    addActiontoAccum: (arg1: Action) => void;
    removeActionFromAccum: (arg1: Action) => void;
    disabled: boolean;
}

const MakeTransparentFilter: React.FC<MakeTransparentFilterProps> = ({ addActiontoAccum, removeActionFromAccum,  disabled}) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleOnClick = () => {
        if (disabled) return;
        setClicked(!clicked);
    } 

    useEffect(() => {
        if (clicked) {
            addActiontoAccum({actionName : MAKE_TRANSPARENT_ACTION_NAME , value : ''})
        } else {
            removeActionFromAccum({actionName : MAKE_TRANSPARENT_ACTION_NAME , value : ''})
        }
    }, [clicked])

    return (
        <div className={`make-transparent-filter ${disabled ? 'disabled-picker': ''}`}>
            <div className={`input-filter ${clicked ? 'clicked' : ''}`} onClick={handleOnClick}>
                <span>Make Transparent</span>
                <img className={`icon`} src={`assets/icons/${clicked ? 'minus.svg' : 'transparency.svg'}`} />
            </div>
        </div>
    );
};

export default MakeTransparentFilter;