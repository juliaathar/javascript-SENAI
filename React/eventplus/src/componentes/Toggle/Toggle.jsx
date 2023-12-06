import React from "react";

import "./Toggle.css";

const Toggle = ({fnManipulator = null, toggleActive = false}) => {
  
  const fakeId = Math.random()
  return (
    <>
      <input type="checkbox" id={`switch-check${fakeId}`} className="toggle__switch-check" />

      <label className={`toggle ${toggleActive ? "toggle--active" : ""}`} htmlFor="switch-check" onClick={fnManipulator}>
        <div className={`toggle___switch ${toggleActive ? "toggle__switch--active" : ""}`}></div>
      </label>
    </>
  );
};

export default Toggle;