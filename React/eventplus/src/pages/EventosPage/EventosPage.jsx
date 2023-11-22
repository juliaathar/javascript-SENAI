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

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [idTipoEvento, setIdTipoEvento] = useState("");

  useEffect(() => {
    //define a chamada em nossa api
    async function loadEvents() {
      try {
        const retorno = await api.get(eventsResource);
        setEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
      }
    }
    //chama a função/api no carregamento da página/componente
    loadEvents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (nomeEvento.trim().length < 3) {
      alert("deve ter mais de 3 caracteres");
    }

    try {
      const retorno = await api.post(eventsResource, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        dataEvento: dataEvento,
        idTipoEvento: idTipoEvento
      });
      console.log("Retorno da API:", retorno.data);
    } catch (error) {
      alert("erro ao cadastrar");
    }
  }

  function showUpdateForm() {
    alert("editando");
  }
  function handleDelete() {
    alert("deletando");
  }

  const tipoEventoOptions = [{ value: "teste", text: "Teste" }]; //apenas mock pra teste
  return (
    <>
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro de Eventos"} />
              <ImageIllustrator imageRender={eventoImage} />
              <form className="ftipo-evento" onSubmit={handleSubmit}>
                <Input
                  id="Nome"
                  placeholder="Nome"
                  name={"nome"}
                  type={"text"}
                  required={"required"}
                  fnManipulator={(e) => {
                    setNomeEvento(e.target.value);
                  }}
                />
                <Input
                  id="Descrição"
                  placeholder="Descrição"
                  name={"descrição"}
                  type={"text"}
                  required={"required"}
                  fnManipulator={(e) => {
                    setDescricao(e.target.value);
                  }}
                />
                <Input
                  id="Data"
                  placeholder="Data"
                  name={"data"}
                  type={"date"}
                  required={"required"}
                  fnManipulator={(e) => {
                    setDataEvento(e.target.value);
                  }}
                />
                <Select
                  id="TipoEvento"
                  placeholder="Tipo Evento"
                  name={"tipoevento"}
                  type={"text"}
                  required={"required"}
                  options={tipoEventoOptions}
                  fnManipulator={(e) => {
                    setIdTipoEvento(e.target.value);
                  }}
                />
                <Button
                  textButton="Cadastrar"
                  id="cadastrar"
                  name="cadastrar"
                  type="submit"
                />
              </form>
            </div>
          </Container>

          <section className="lista-eventos-section">
            <Container>
              <Titulo titleText={"Lista de eventos"} color="white" />
              <TableEvents
                dados={eventos}
                fnUpdate={showUpdateForm}
                fnDelete={handleDelete}
              />
            </Container>
          </section>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
