import React from "react";
import Titulo from "../../componentes/Titulo/Titulo";
import MainContent from "../../componentes/Main/MainContent"
import Container from "../../componentes/Container/Container"

const TipoEventosPage = () => {
  return (
    <>
    <MainContent>
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento-box">
            <Titulo/>
            <ImageIllustrator/>
            <form action="" className="ftipo-evento">
              <p>Formulário será criado aqui</p>
            </form>
          </div>
        </Container>
      </section>
    </MainContent>
    </>
  );
};

export default TipoEventosPage;
