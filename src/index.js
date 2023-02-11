import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BlockchainProvider from "./contexts/blockchain";
import MetamaskProvider from "./contexts/metamask";
import MainProvider from "./contexts/main";

ReactDOM.render(
  <React.StrictMode>
    <BlockchainProvider>
      <MetamaskProvider>
        <MainProvider>
          <App />
        </MainProvider>
      </MetamaskProvider>
    </BlockchainProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
