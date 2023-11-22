import React from "react";
import './Nav.css';
import logoMobile from "../../assets/images/images/logo-white.svg";
import logoDesktop from "../../assets/images/images/logo-pink.svg";
import { Link } from "react-router-dom"; //importando componente da biblioteca.

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  console.log(`${exibeNavbar}`);

  return (
    <nav className= {`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span
        className="navbar__close"
        onClick={() => {
          setExibeNavbar(false);
        }}
      >
        X
      </span>

      <Link to="/" className="eventlogo">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
          alt=""
        />
      </Link>

      <div className="navbar__items-box">
        <Link className="navbar__item" to="/">Home</Link>
        <Link className="navbar__item" to="/tiposeventos">Tipo de Eventos</Link>
        <Link className="navbar__item" to="/login">Login</Link>
        <Link className="navbar__item" to="/eventos">Eventos</Link>
        <Link className="navbar__item" to="/testecopy">Teste useEffect</Link>
      </div>
    </nav>
  );
};

export default Nav;
