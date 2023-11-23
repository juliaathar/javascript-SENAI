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

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState();

  useEffect(() => {
    async function getNextEvents() {
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
    }
    getNextEvents();
  }, []);

  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
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

{
  /* <NextEvent
title={"C#"}
description={"Evento de C#"}
eventDate={"10/10/2023"}
idEvent={"corinthians"}
/>
<NextEvent
title={"Banco de Dados"}
description={"Evento de Banco de Dados"}
eventDate={"10/10/2023"}
idEvent={"corinthians"}
/>
<NextEvent
title={"React"}
description={"Evento de React"}
eventDate={"10/10/2023"}
idEvent={"corinthians"}
/>
<NextEvent
title={"Cybersecurity"}
description={"Evento de Cybersecurity"}
eventDate={"10/10/2023"}
idEvent={"corinthians"}
/> */
}
