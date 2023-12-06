import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../componentes/Main/MainContent";
import Title from "../../componentes/Titulo/Titulo";
import TableEvA from "./TableEvA/TableEvA";
import Container from "../../componentes/Container/Container";
import { Select } from "../../componentes/FormComponents/FormComponents";
import Spinner from "../../componentes/Spinner/Spinner";
import Modal from "../../componentes/Modal/Modal";
import api, {
  eventsResource,
  MyEventsResource,
  presencesEventsResource,
} from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);
      if (tipoEvento === "1") {
        //chmar a api de todos os eventos
        try {
          const todosEventos = await api.get(eventsResource);
          const meusEventos = await api.get(
            `${MyEventsResource}/${userData.userId}`
          );
          const eventosMarcados = verificaPresenca(
            todosEventos.data,
            meusEventos.data
          );
          setEventos(eventosMarcados);

          console.clear();
          console.log("todos os eventos");
          console.log(todosEventos.data);
          console.log("meus os eventos");
          console.log(meusEventos.data);
          console.log("eventos marcados");
          console.log(eventosMarcados);
        } catch (error) {
          console.log(error);
        }
      } else if (tipoEvento === "2") {
        //chamar a api dos meus eventos

        try {
          const retorno = await api.get(
            `${MyEventsResource}/${userData.userId}`
          );

          const arrEventos = [];
          retorno.data.forEach((e) => {
            arrEventos.push({ ...e.evento, situacao: e.situacao });
          });

          console.log(arrEventos);
          setEventos(arrEventos);
        } catch (error) {
          console.log(error);
        }
      } else {
        setEventos([]);
      }
      setShowSpinner(false);
    }

    loadEventsType();
  }, [tipoEvento]);

  async function loadEventsType() {
    try {
      const retorno = await api.get(eventsResource);
      const dados = await retorno.data;
      setEventos(dados);
      console.log(dados);
    } catch (error) {
      console.log("Deu ruim na api");
    }
  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if (
          arrAllEvents[x].idPresencaEvento === eventsUser[i].evento.idEvento
        ) {
          arrAllEvents[x].situacao = true;
          break;
        }
      }
    }
    return arrAllEvents; //retorna todos os eventos marcados com a prsença do usuário
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {
      try {
        const promise = await api.post(presencesEventsResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId,
        });
        if (promise.status === 201) {
          alert("eba, agora voce podera participar do evento");
        }
        // setTipoEvento(1)
        const todosEventos = await api.get(eventsResource);
        setEventos(todosEventos.data);
      } catch (error) {}
      return;
    }

    try {
      const unconnected = await api.delete(
        `${presencesEventsResource}/${presencaId}`
      );
      if (unconnected.status === 204) {
        const todosEventos = await api.get(eventsResource);
        setEventos(todosEventos.data);
      }
    } catch (error) {}
  }
  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            fnManipulator={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <TableEvA
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
