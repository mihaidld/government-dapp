import React, { useState, useEffect, createContext } from "react";

export const ModeContext = createContext();

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
