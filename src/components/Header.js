import React, { useContext } from "react";
import { ModeContext } from "../context/ModeContext";

const Header = () => {
  // consume context
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeClass =
    mode === "dark" ? "bg-dark text-danger" : "bg-danger text-white";

  return (
    <header className={`p-5 text-center ${modeClass}`}>
      <h1 className="display-1">Welcome to Citizen country</h1>
      <p className="h4">
        A fictional country with a basic <i>token economy</i>
      </p>
    </header>
  );
};

export default Header;
