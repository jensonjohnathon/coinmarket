import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./MetaConnect.css";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };

  return (
    <div className="WalletCard">
      <div className="top">
        <h3 id="Account"> Account: {account} </h3>
      </div>
      <div>
        <h3 id="Balance">
          Balance: {balance} {balance ? "ETH" : null}
        </h3>
        <div id="Error">
          {errorMessage ? (
            <p variant="body1" color="red">
              Error: {errorMessage}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <button onClick={connectHandler} id="Connect">
          Connect Account
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
