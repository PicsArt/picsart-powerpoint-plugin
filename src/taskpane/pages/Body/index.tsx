import React, { useCallback, useMemo, useState } from "react";
import { RemoveBg, Enhance, GenerateImages } from "@pages/index";
import { Account, ActionBtnsGroup } from "@ui/index";
import "./styles.scss"

const Body: React.FC = () => {
  const [balanceUpdated, setBalanceUpdated] = useState<boolean>(false);
  const [btnIndex, setBtnIndex] = useState<number>(0);
  
  const handleUpdateBalance = () => {
    setBalanceUpdated((prev) => !prev);
  }

  const handleSelect = useCallback((index : number) : void => {
    setBtnIndex(index)
  }, [])

  const pages : React.ReactElement[] = useMemo(() => [
    <RemoveBg handleUpdateBalance={handleUpdateBalance} />,
    <Enhance handleUpdateBalance={handleUpdateBalance} />,
    <GenerateImages handleUpdateBalance={handleUpdateBalance} />,
  ], [])

  return (
    <div className="body">
      <ActionBtnsGroup handleSelect={handleSelect} btnIndex={btnIndex}/> 
      { pages[btnIndex]}
      <Account updateBalance={balanceUpdated} />
    </div>
  );
};

export default Body;