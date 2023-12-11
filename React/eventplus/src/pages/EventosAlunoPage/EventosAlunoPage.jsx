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
  commentaryEventResource,
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
  const { userData } = useContext(UserContext);
  const [comentario, setComentario] = useState("");
  const [idEvento, setIdEvento] = useState("");
  const [idComentario, setIdComentario] = useState(null);

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
            arrEventos.push({
              ...e.evento,
              situacao: e.situacao,
              idPresencaEvento: e.idPresencaEvento,
            });
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
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
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

  const loadMyCommentary = async (idUsuario, idEvento) => {
    // console.log("fui chamado");

    try {
      // api está retornando sempre todos os comentários do usuário
      const promise = await api.get(
        `${commentaryEventResource}?idUsuario=${idUsuario}&idEvento=${idEvento}`
      );

      const myComm = await promise.data.filter(
        (comm) => comm.idEvento === idEvento && comm.idUsuario === idUsuario
      );

      // console.log("QUANTIDADE DE DADOS NO ARRAY FILTER");
      // console.log(myComm.length);
      // console.log(myComm);

      setComentario(myComm.length > 0 ? myComm[0].descricao : "");
      setIdComentario(myComm.length > 0 ? myComm[0].idComentarioEvento : null);
    } catch (error) {
      console.log("Erro ao carregar o evento");
      console.log(error);
    }
  };

  const postMyCommentary = async (descricao, idUsuario, idEvento) => {
    try {
      const promise = await api.post(commentaryEventResource, {
        descricao: descricao,
        exibe: true,
        idUsuario: idUsuario,
        idEvento: idEvento,
      });

      if (promise.status === 200) {
        alert("Comentário cadastrado com sucesso");
      }
    } catch (error) {
      console.log("Erro ao cadastrar o evento");
      console.log(error);
    }
  };

  const showHideModal = (idEvent) => {
    // console.clear();
    // console.log("id do evento atual");
    // console.log(idEvent);

    setShowModal(showModal ? false : true);
    // setUserData({ ...userData, idEvento: idEvent });
    setIdEvento(idEvent);
    // console.log("após guardar no state do usuário");
    // console.log(idEvent);
  };

  const commentaryRemove = async (idComentario) => {
    // alert("Remover o comentário " + idComentario);

    try {
      const promise = await api.delete(
        `${commentaryEventResource}/${idComentario}`
      );
      if (promise.status === 200) {
        alert("Evento excluído com sucesso!");
      }
    } catch (error) {
      console.log("Erro ao excluir ");
      console.log(error);
    }
  };
  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {
      try {
        //connect
        const promise = await api.post(presencesEventsResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId,
        });

        if (promise.status === 201) {
          loadEventsType();
          alert("Presença confirmada, parabéns");
        }
      } catch (error) {}
      return;
    }

    // unconnect - aqui seria o else
    try {
      const unconnected = await api.delete(
        `${presencesEventsResource}/${presencaId}`
      );
      if (unconnected.status === 204) {
        loadEventsType();
        alert("Desconectado do evento");
      }
    } catch (error) {
      console.log("Erro ao desconecar o usuário do evento");
      console.log(error);
    }
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
          fnGet={loadMyCommentary}
          fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
