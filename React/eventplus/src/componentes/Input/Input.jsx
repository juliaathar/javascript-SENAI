import React, { useState } from "react";

const Input = ({ type, placeholder, name, id, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      <span>{value}</span>
    </>
  );
};

export default Input;
