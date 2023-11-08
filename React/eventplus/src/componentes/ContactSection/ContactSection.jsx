import React from "react";
import Titulo from "../Titulo/Titulo";
import './ContactSection.css'
import contatoMap from "../../assets/images/images/contato-map.png"

const ContactSection = () => {
  return (
    <section>
        <Titulo titleText={"Contato"}/>

      <div className="contato__endereco-box">
        <img src={contatoMap} alt="" className="contato__img-map" />
        <p>
          Rua Niterói, 180 - Centro <br />
          São Paulo do Sul - SP <br />
        <a href="tel:+551142252000" className="contato__telefone">
          (11) 42252000
        </a>
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
