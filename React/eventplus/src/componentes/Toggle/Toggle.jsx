import React from "react";

import "./Toggle.css";

const Toggle = ({fnManipulator = null}) => {
  return (
    <>
      <input type="checkbox" id="switch-check" className="toggle__switch-check" />

      <label className="toggle" htmlFor="switch-check" onClick={fnManipulator}>
        <div className="toggle___switch"></div>
      </label>
    </>
  );
};

export default Toggle;
