import React, { createContext } from "react";
import { Token_address, Token_abi } from "../contracts/Token";
import { Government_address, Government_abi } from "../contracts/Government";
import { useContract } from "../hooks/useContract";

// Contracts context
export const ContractsContext = createContext(null);

// Contracts provider
export const ContractsProvider = ({ children }) => {
  const token = useContract(Token_address, Token_abi);
  const government = useContract(Government_address, Government_abi);
  return (
    <>
      <ContractsContext.Provider value={{ token, government }}>
        {children}
      </ContractsContext.Provider>
    </>
  );
};
