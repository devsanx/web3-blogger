import { ethers } from "ethers";
import { createContext } from "react";
import contract from "../bin/Blog.json";
import { create } from "ipfs-http-client";
import { IPFS_API, CHAIN_NETWORK_ID } from "../constants/main";

export const BlockchainContext = createContext();

const BlockchainProvider = ({ children }) => {
  // wallet connection
  const ethereum = window?.ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  // blockchain contract connection
  const abi = contract.abi;
  const contractAddress = contract.networks[CHAIN_NETWORK_ID].address;
  const BlogContract = new ethers.Contract(contractAddress, abi, signer);

  // ipfs connection
  const ipfsClient = create(IPFS_API);

  const contextValue = {
    ethereum,
    contract: BlogContract,
    ipfsClient,
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
