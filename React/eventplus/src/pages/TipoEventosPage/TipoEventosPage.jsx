import React, { useEffect, useState } from "react";
import Titulo from "../../componentes/Titulo/Titulo";
import MainContent from "../../componentes/Main/MainContent";
import Container from "../../componentes/Container/Container";
import "./TipoEventosPage.css";
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import tipoEventoImage from "../../assets/images/images/tipo-evento.svg";
import { Input, Button } from "../../componentes/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import TableTP from "./TableTP/TableTP";
import Notification from "../../componentes/Notification/Notification";
import Spinner from "../../componentes/Spinner/Spinner"

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null); //para editar, por causa do evento
  const [tipoEventos, setTipoEventos] = useState([]);
  const [notifyUser, setNotifyUser] = useState();
  const [showSpinner, setShowSpinner] = useState(false) //spinner loading

  useEffect(() => {
    //define a chamada em nossa api
    async function loadEventsType() {
      setShowSpinner(true)
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
      }

      setShowSpinner(false)
    }
    //chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      //atualizar na api
      const retorno = await api.put(eventsTypeResource + "/" + idEvento, {
        titulo:titulo
      }); // o id está no state. pode fazer assim ou interpolado.

      //reseta o state
      setTitulo("")
      setIdEvento(null)

      if (retorno.status === 204) {
        // notificar o usuario
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Evento cadastrado com sucesso`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
          showMessage: true,
        });
        //atualizar os dados na tela

        const promise = await api.get(eventsTypeResource);

        setTipoEventos(promise.data.titulo)

        //volta para tela de cadastro

        editActionAbort()
      }
    } catch (error) {
      //notificar erro o usuário
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao editar`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro",
        showMessage: true,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `O nome deve ter mais que 3 caracteres`,
        imgIcon: "warning",
        imgAlt: "Imagem de ilustração de erro",
        showMessage: true,
      });
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Evento cadastrado com sucesso`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
        showMessage: true,
      });
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Tente novamente`,
        imgIcon: "danger",
        imgAlt: "Imagem de ilustração de erro",
        showMessage: true,
      });
    }
  }

  //apaga o tipo de evento na api
  async function handleDelete(idTipoEvento) {
    if (!window.confirm("Confirma a exclusão?")) {
      return;
    }

    try {
      const promise = await api.delete(
        `${eventsTypeResource}/ ${idTipoEvento}`
      );

      if (promise.status == 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Evento excluído com sucesso`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok",
          showMessage: true,
        });
        // setTipoEventos([]);

        //DESAFIO: fazer uma função psra retirar o registro apagado fo array tipoEventos

        const buscaEventos = await api.get(eventsTypeResource);

        setTipoEventos(buscaEventos.data);
      }
    } catch (error) {
      alert("deu ruim");
    }
  }

  //exibe o formulário de edição
  async function showUpdateForm(idTipoEvento) {
    setFrmEdit(true);
    setIdEvento(idTipoEvento); // preenche o id do evento para poder atualizar

    try {
      const retorno = await api.get(`${eventsTypeResource}/ ${idTipoEvento}`);

      setTitulo(retorno.data.titulo);
      console.log(retorno.data);
    } catch (error) {}
  }

  //cancela a tela de edição (volta pra o form de cadastro)
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null);
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {showSpinner ? <Spinner/> : null}

      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro tipo de eventos"} />
              <ImageIllustrator imageRender={tipoEventoImage} />
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  //Cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      fnManipulator={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />

                    <Button
                      textButton="Cadastrar"
                      id={"cadastrar"}
                      name={"cadastrar"}
                      type="submit"
                    />
                  </>
                ) : (
                  //Editar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Titulo"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      fnManipulator={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <div className="buttons-editbox">
                      <Button
                        textButton="Atualizar"
                        id="atualizar"
                        name="atualizar"
                        type="submit"
                        additionalClass="button-component--middle"
                      />
                      <span>{idEvento}</span>
                      <Button
                        textButton="Cancelar"
                        id="cancelar"
                        name="cancelar"
                        type="button"
                        additionalClass="button-component--middle"
                        fnManipulator={editActionAbort}
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
            <Titulo titleText={"Lista de tipos de eventos"} color="white" />
            <TableTP
              dados={tipoEventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
