import React from "react";
import Banner from "../../componentes/Banner/Banner";
import ContactSection from "../../componentes/ContactSection/ContactSection";
import MainContent from "../../componentes/Main/MainContent";
import NextEvent from "../../componentes/NextEvent/NextEvent";
import Titulo from "../../componentes/Titulo/Titulo";
import VisionSection from "../../componentes/VisionSection/VisionSection";
import Container from "../../componentes/Container/Container";
import "./HomePage.css";

const HomePage = () => {
  return (
    <MainContent>
      <Banner />
      <section className="proximos-eventos">
        <Container>
          <Titulo titleText={"Próximos eventos"} />
          <div className="events-box">
            <NextEvent
              title={"Evento de C#"}
              description={"Evento de C#"}
              eventDate={"10/10/2023"}
              idEvent={"corinthians"}
            />
            <NextEvent />
            <NextEvent />
            <NextEvent />
            <NextEvent />
            <NextEvent />
            <NextEvent />
            <NextEvent />
          </div>
        </Container>
      </section>
      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
