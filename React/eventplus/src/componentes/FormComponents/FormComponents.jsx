import React from "react";
import "./FormComponentes.css";

export const Input = ({
  type,
  id,
  value,
  required,
  additionalClass,
  name,
  placeholder,
  fnManipulator,
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      required={required ? "required" : ""}
      name={name}
      className={`input-component ${additionalClass}`}
      placeholder={placeholder}
      onChange={fnManipulator}
      autoComplete="off"
    />
  );
};

export const Label = ({ htmlFor, labelText }) => {
  return <label htmlFor={htmlFor}> {labelText} </label>;
};

//componente criado recebendo props ao invés de destructuring
export const Button = (props) => {
  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type}
      className={`button-component ${props.additionalClass}`}
      onClick={props.fnManipulator}
    >
      {props.textButton}
    </button>
  );
};

export const Select = ({
  required,
  id,
  name,
  options,
  fnManipulator,
  additionalClass = "",
  defaultValue,
}) => {
  return (
    <select
      name={name}
      id={id}
      required={required}
      className={`input-component ${additionalClass}`}
      onChange={fnManipulator}
      defaultValue={defaultValue}
    >
      <option value="">Tipo Evento</option>
      {options.map((o) => {
        return (
          <option key={Math.random()} value={o.value}>
            {o.text}
          </option>
        );
      })}
    </select>
  );
};
