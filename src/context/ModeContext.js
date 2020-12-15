import React, { useState, useEffect, createContext } from "react";

// Mode context
export const ModeContext = createContext();

// Mode provider to handle dark / light mode, gets color mode from localStorage or set is light by default
export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("colorMode") || "light"
  );
  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
