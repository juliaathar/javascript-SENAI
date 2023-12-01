import React, { useContext } from "react";
import "./Nav.css";
import logoMobile from "../../assets/images/images/logo-white.svg";
import logoDesktop from "../../assets/images/images/logo-pink.svg";
import { Link } from "react-router-dom"; //importando componente da biblioteca.
import { UserContext } from "../../context/AuthContext";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  const { userData } = useContext(UserContext);

  console.log(`${exibeNavbar}`);

  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
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
        <Link className="navbar__item" to="/">
          Home
        </Link>
        {userData.nome && userData.role === "Admin" ? (
          <>
            <Link className="navbar__item" to="/tiposeventos">
              Tipo de Eventos
              <Link className="navbar__item" to="/eventos">
                Eventos
              </Link>
            </Link>
          </>
        ) : (
          userData.nome && userData.role === "Comum" ? (
            <Link className="navbar__item" to="/eventos">
            Eventos Aluno
          </Link>
          ) : (
            null
          )
        )}
      </div>
    </nav>
  );
};

export default Nav;
