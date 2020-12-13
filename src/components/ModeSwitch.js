import React, { useContext } from "react";
import { ModeContext } from "./../context/ModeContext";

const ModeSwitch = () => {
  const { mode, setMode } = useContext(ModeContext);
  const handleModeChange = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  };
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";

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
        Dark Mode
      </label>
    </div>
  );
};

export default ModeSwitch;
