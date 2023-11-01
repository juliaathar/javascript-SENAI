import React from "react";
import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/eventos"}>Eventos</Link>
        <Link to={"/tiposeventos"}>Tipos de Eventos</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/teste"}>Calculadora</Link>
      </nav>
    </header>
  );
};

export default Header;
