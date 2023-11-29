import React, { useEffect, useState } from "react";
import Container from "../../componentes/Container/Container";
import Header from "../../componentes/Header/Header";
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import MainContent from "../../componentes/Main/MainContent";
import Titulo from "../../componentes/Titulo/Titulo";
import eventoImage from "../../assets/images/images/evento.svg";
import { Button, Input } from "../../componentes/FormComponents/FormComponents";
import { Select } from "../../componentes/FormComponents/FormComponents";
import TableEvents from "../../pages/EventosPage/TableEvents/TableEvents";
import api, { eventsResource } from "../../Services/Service";
import { eventsTypeResource } from "../../Services/Service";
import Notification from "../../componentes/Notification/Notification";
import Spinner from "../../componentes/Spinner/Spinner";

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [tiposEventos, setTiposEventos] = useState([]);
  const [idEvento, setIdEvento] = useState("");
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [idTipoEvento, setIdTipoEvento] = useState("");
  const idInstituicao = "1dd19c4d-9812-4d5c-a757-3ba70867ca4b";
  const [frmEdit, setFrmEdit] = useState(false);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false)

  async function loadEvents() {
    setShowSpinner(true)
    try {
      const retorno = await api.get(eventsResource);
      const dados = await retorno.data;
      setEventos(dados);
      console.log(dados);
    } catch (error) {
      console.log("Deu ruim na api");
    }
    setShowSpinner(false)
  }

  async function loadEventsType() {
    setShowSpinner(true)
    try {
      const retorno = await api.get(eventsTypeResource);
      const dados = await retorno.data;
      setTiposEventos(dados);

      console.log(retorno.data);
    } catch (error) {
      console.log("Deu ruim na api");
      console.log(error);
    }
    setShowSpinner(false)
  }

  useEffect(() => {
    loadEvents();
    loadEventsType();
  }, []);

  function dePara(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (nomeEvento.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Insira mais de 3 caracteres para cadastrar um evento",
        imgIcon: "warning",
        imgAlt: "Imagem de aviso",
        showMessage: true,
      });

      editActionAbort();
      return;
    }

    try {
      const dados = {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
      };
      console.log(dados);

      const retorno = await api.post(eventsResource, dados);

      console.log(retorno);

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento cadastrado com sucesso!",
        imgIcon: "success",
        imgAlt: "Imagem de sucesso",
        showMessage: true,
      });

      editActionAbort();
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Erro ao cadastrar evento",
        imgIcon: "danger",
        imgAlt: "Imagem de erro",
        showMessage: true,
      });
    }

    const buscaEventos = await api.get(eventsResource);
    setEventos(buscaEventos.data);
  }

  async function handleDelete(idElement) {
    try {
      const deletar = await api.delete(`${eventsResource}/${idElement}`);
      if (deletar.status === 204) {
        const buscaEventos = await api.get(eventsResource);
        setEventos(buscaEventos.data);
      }

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento excluido com sucesso",
        imgIcon: "success",
        imgAlt: "Imagem de sucesso",
        showMessage: true,
      });
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Erro ao excluir evento",
        imgIcon: "danger",
        imgAlt: "Imagem de erro",
        showMessage: true,
      });
    }
  }

  function editActionAbort() {
    setFrmEdit(false);

    setNomeEvento("");
    setDescricao("");
    setIdTipoEvento("");
    setDataEvento("");
  }

  async function showUpdateForm(idElement) {
    setFrmEdit(true);

    try {
      const promise = await api.get(`${eventsResource}/${idElement}`);

      setNomeEvento(promise.data.nomeEvento);
      setDescricao(promise.data.descricao);
      setIdTipoEvento(promise.data.idTipoEvento);
      setDataEvento(promise.data.dataEvento.slice(0, 10));

      setIdEvento(promise.data.idEvento);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "Erro ao exibir formulário de edição",
        imgIcon: "danger",
        imgAlt: "Imagem de erro",
        showMessage: true,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (nomeEvento.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "Insira mais de 3 caracteres para cadastrar um evento",
        imgIcon: "warning",
        imgAlt: "Imagem de aviso",
        showMessage: true,
      });
      setNomeEvento("");
      return;
    }

    try {
      const dados = await api.put(`${eventsResource}/${idEvento}`, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento editado com sucesso!",
        imgIcon: "success",
        imgAlt: "Imagem de sucesso",
        showMessage: true,
      });

      const response = await api.get(eventsResource);
      setEventos(response.data);

      editActionAbort();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner/> : null}

      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro de Evento"} />

              <ImageIllustrator imageRender={eventoImage} />

              <form
                id="form"
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  <>
                    <Input
                      placeholder={"Nome"}
                      id={"nome"}
                      name="nome"
                      value={nomeEvento}
                      fnManipulator={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                      type="text"
                    />

                    <Input
                      placeholder={"Descrição"}
                      id={"descricao"}
                      name="descricao"
                      value={descricao}
                      fnManipulator={(e) => {
                        setDescricao(e.target.value);
                      }}
                      type="text"
                    />

                    <Input
                      id={"data"}
                      name="data"
                      value={dataEvento}
                      fnManipulator={(e) => {
                        setDataEvento(e.target.value);
                      }}
                      type="date"
                    />

                    <Select
                      id="select"
                      name="select-eventos"
                      options={dePara(tiposEventos)}
                      value={idTipoEvento}
                      fnManipulator={(e) => {
                        setIdTipoEvento(e.target.value);
                      }}
                    />

                    <Button
                      id={"cadastrar"}
                      textButton={"Cadastrar"}
                      name="cadastrar"
                      type={"submit"}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      placeholder={"Nome"}
                      id={"nome"}
                      name="nome"
                      value={nomeEvento}
                      manipulationFuntion={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                      type="text"
                    />

                    <Input
                      placeholder={"Descrição"}
                      id={"descricao"}
                      name="descricao"
                      value={descricao}
                      manipulationFuntion={(e) => {
                        setDescricao(e.target.value);
                      }}
                      type="text"
                    />
                    <Input
                      placeholder={"dd/mm/aaaa"}
                      id={"data"}
                      type="date"
                      value={dataEvento}
                      manipulationFuntion={(e) => {
                        setDataEvento(e.target.value);
                      }}
                    />

                    <Select
                      id="select"
                      name="select-eventos"
                      value={idTipoEvento}
                      manipulationFuntion={(e) => {
                        setIdTipoEvento(e.target.value);
                      }}
                      options={dePara(tiposEventos)}
                    />

                    <div className="buttons-editbox">
                      <Button
                        id={"cadastrar"}
                        textButton={"Cadastrar"}
                        type="submit"
                        manipulationFuntion={handleUpdate}
                      />
                      <Button
                        id={"cancelar"}
                        textButton={"cancelar"}
                        manipulationFuntion={editActionAbort}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Titulo titleText={"Lista de Eventos"} color={"white"} />

            <TableEvents
              dados={eventos}
              fnDelete={handleDelete}
              fnUpdate={showUpdateForm}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
