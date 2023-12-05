import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../componentes/Main/MainContent";
import Title from "../../componentes/Titulo/Titulo";
import TableEvA from "./TableEvA/TableEvA";
import Container from "../../componentes/Container/Container";
import { Select } from "../../componentes/FormComponents/FormComponents";
import Spinner from "../../componentes/Spinner/Spinner";
import Modal from "../../componentes/Modal/Modal";
import api, { eventsResource, MyEventsResource } from "../../Services/Service";

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
          const retorno = await api.get(eventsResource);
          setEventos(retorno.data);
          console.log(retorno.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        //chamar a api dos meus eventos

        try {
          const retorno = await api.get(
            `${MyEventsResource}/${userData.userId}`
          );

          const arrEventos = [];
          retorno.data.forEach((e) => {
            arrEventos.push(e.evento);
          });

          console.log(arrEventos);
          setEventos(arrEventos);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setEventos([]);

    loadEventsType();
    setShowSpinner(false);
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

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
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
