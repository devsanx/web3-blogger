import { createContext, useContext, useState } from "react";
import { BlockchainContext } from "./blockchain";

export const MetamaskContext = createContext();

const MetamaskProvider = ({ children }) => {
  const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
  const { ethereum } = useContext(BlockchainContext);

  const connectWallet = async () => {
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWallet(account[0]);
    localStorage.setItem("wallet", account[0]);
  };

  const disconnectWallet = () => {
    setWallet("");
    localStorage.setItem("wallet", "");
  };

  const contextValue = {
    wallet,
    connectWallet,
    disconnectWallet,
  };

  return (
    <MetamaskContext.Provider value={contextValue}>
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskProvider;
