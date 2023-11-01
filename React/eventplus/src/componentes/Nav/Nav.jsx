import React from "react";
import "./Nav.css";
import logoMobile from "../../assets/images/images/logo-white.svg";
import logoDesktop from "../../assets/images/images/logo-pink.svg";

const Nav = () => {
  return (
    <nav className="navbar">
      <span className="navbar__close">X</span>
      <a href="eventlogo">
        <img className="eventlogo__logo-image" src={logoMobile} alt="" />
      </a>

      <div className="navbar__items-box">
        <a href="">Home</a>
        <a href="">Tipos de Evento</a>
        <a href="">Usuários</a>
      </div>
    </nav>
  );
};

export default Nav;
