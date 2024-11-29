import React, { useEffect, useState } from "react";
import ChangeAPIkeyModal from "@modals/ChangeAPIkey";
import Toast from "@ui/Toast";
import { getBalance } from "@api/index";
import { BUY_MORE_CREDITS_URL } from "@constants/url";
import "./styles.scss";

interface AccountProps {
  updateBalance: boolean;
}

const Account: React.FC<AccountProps> = ({ updateBalance }) => {
  const [keyBalance, setKeyBalance] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getBalance().then((result) => {
        if (result.success) {
            setKeyBalance(result.msg);
        } else {
          setError(result.msg);
        }
    });
  }, [updateBalance])

  const handleOnClick = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="account-container">
        {isOpen && <ChangeAPIkeyModal  handleClose={handleClose} />}
        { error && <Toast text={error} type="error" /> }
        <p className="title">Current Balance</p>
        <p className="subtitle">Upgrade your plan for more credits</p>
        <span className="credits">{keyBalance} credits left </span>
        <div className="btn-container">
          <button className="buy-credits">
              <a href={BUY_MORE_CREDITS_URL}>Buy more credits </a>
          </button>
        </div>
        <a onClick={handleOnClick} className="change-key" href="#">Change API Key </a>
    </div>
  );
};

export default React.memo(Account);