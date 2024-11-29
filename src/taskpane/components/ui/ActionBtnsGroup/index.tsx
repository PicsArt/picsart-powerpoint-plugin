import React from "react";
import "./styles.scss";

const btnNames : string[] = ["Remove\nBackground", "Enhance", "Generate\nImages"];
interface ActionBtnsGroupProps {
    handleSelect: (arg : number) => void;
    btnIndex: number
}

const ActionBtnsGroup: React.FC<ActionBtnsGroupProps> = ({  handleSelect, btnIndex }) => {
  return (
    <div className="action-button-group">
        { btnNames?.map((name, index) => {
            return (
                <div key={index} onClick={() => handleSelect(index)} className={`action-button ${ index == btnIndex ? "selected" : "" }`}>
                    {name}
                </div>
            )
        })}
    </div>
  );
};

export default React.memo(ActionBtnsGroup);