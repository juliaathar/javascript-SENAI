import React from "react";
import Titulo from "../../componentes/Titulo/Titulo";
import MainContent from "../../componentes/Main/MainContent";
import Container from "../../componentes/Container/Container";
import "./TipoEventosPage.css"
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import tipoEventoImage from "../../assets/images/images/tipo-evento.svg";

const TipoEventosPage = () => {
  return (
    <>
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro tipo de eventos"} />
              <ImageIllustrator
                imageRender={tipoEventoImage}
              />
              <form className="ftipo-evento">
                
              </form>
            </div>
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
