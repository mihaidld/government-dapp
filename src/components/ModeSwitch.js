import React, { useContext } from "react";
import { ModeContext } from "./../context/ModeContext";
import { IconContext } from "react-icons";
import { FaMoon } from "react-icons/fa";

const ModeSwitch = () => {
  // consume context
  const { mode, setMode } = useContext(ModeContext);

  // define classes to handle mode
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";

  // define event handler to set state
  const handleModeChange = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`form-check form-switch ${modeClass}`}>
      <input
        className="form-check-input"
        type="checkbox"
        id="activate"
        checked={mode === "dark"}
        onChange={handleModeChange}
      />
      <label className="form-check-label" htmlFor="activate">
        <IconContext.Provider value={{ className: modeClass, size: "1em" }}>
          <div>
            <FaMoon />
          </div>
        </IconContext.Provider>
      </label>
    </div>
  );
};

export default ModeSwitch;
