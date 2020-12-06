import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, theme } from "@chakra-ui/core";
import "focus-visible/dist/focus-visible";
import { Web3Provider } from "./context/Web3Context";
import { ContractsProvider } from "./context/ContractsContext";
import { ModeContextProvider } from "./context/ModeContext";
import { DappProvider } from "./context/DappContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS={true}>
      <ModeContextProvider>
        <Web3Provider>
          <ContractsProvider>
            <DappProvider>
              <App />
            </DappProvider>
          </ContractsProvider>
        </Web3Provider>
      </ModeContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
