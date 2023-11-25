import React, { useEffect, useState } from "react";
import Banner from "../../componentes/Banner/Banner";
import ContactSection from "../../componentes/ContactSection/ContactSection";
import MainContent from "../../componentes/Main/MainContent";
import NextEvent from "../../componentes/NextEvent/NextEvent";
import Titulo from "../../componentes/Titulo/Titulo";
import VisionSection from "../../componentes/VisionSection/VisionSection";
import Container from "../../componentes/Container/Container";
import "./HomePage.css";
import axios from "axios";
import api, { nextEventResource } from "../../Services/Service";
import Notification from "../../componentes/Notification/Notification";
import Spinner from "../../componentes/Spinner/Spinner";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    async function getNextEvents() {
      setShowSpinner(true);
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;

        setNextEvents(dados);
      } catch (error) {
        console.log(error);
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Não foi possível se conectar, verifique sua conexão`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
          showMessage: true,
        });
      }
      setShowSpinner(false);
    }
    getNextEvents();
  }, []);

  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner/> : null}
      <Banner />
      <section className="proximos-eventos">
        <Container>
          <Titulo titleText={"Próximos eventos"} />
          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
