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

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [idEvento, setIdEvento] = useState(null);
  const [tiposEvento, setTiposEvento] = useState([]);
  const [idInstituicao, setIdInstituicao] = useState("d3d24c87-cca7-42f9-ab1c-a10a7bbd4972");
  const [idTipoEvento, setIdTipoEvento] = useState("");
  

  async function loadEvents() {
    try {
      const retorno = await api.get(eventsResource);
      const dados = await retorno.data;
      setEventos(dados);
      console.log(dados);
    } catch (error) {
      console.log("Deu ruim na api");
    }
  }

  async function loadEventsType() {
    try {
      const retorno = await api.get(eventsTypeResource);
      const dados = await retorno.data;
      setTiposEvento(dados);

      console.log(retorno.data);
    } catch (error) {
      console.log("Erro na api");
      console.log(error);
    }
  }

  useEffect(() => {
    loadEvents();
    loadEventsType();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (nomeEvento.trim().length < 3) {
      alert("O nome deve conter no minimo 3 caracteres");
      return;
    }
    try {
      const retorno = await api.post(eventsResource, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao
      });

      console.log(retorno);
      setNomeEvento(nomeEvento);
      setDescricao(descricao);
      setIdTipoEvento(idTipoEvento);
      setDataEvento(dataEvento);

      const buscaEvento = await api.get(eventsResource);
      setEventos(buscaEvento.data);
    } catch (error) {
      console.log(error);
    }
  }

  function showUpdateForm() {
    alert("editando");
  }

  function editActionAbort() {
    setFrmEdit(false);
    setNomeEvento("");
    setIdEvento(null);

  }
  async function handleUpdate(e) {}

  async function handleDelete(idElement) {
    try {
      if (window.confirm("Confirma a exlusao?")) {
        const response = await api.delete(`${eventsResource}/${idElement}`);

        if (response.status == 204) {
          alert("Excluido com sucesso");
        }
      }
      setEventos(eventos);
      const buscaEvento = await api.get(eventsResource);
      setEventos(buscaEvento.data);
    } catch (error) {
      alert("Deu familia");
    }
  }

  const tipoEventoOptions = [{ value: "f41023c7-e7a8-483f-a83c-314cc0581f00", text: "Back-end" }]; //apenas mock pra teste
  return (
    <>
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo titleText={"Cadastro de Eventos"} />
              <ImageIllustrator imageRender={eventoImage} />
              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit?(
                  <>
                  <Input
                  id="Nome"
                  placeholder="Nome"
                  name={"nome"}
                  type={"text"}
                  required={"required"}
                  value={nomeEvento}
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
                  value={descricao}
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
                  value={dataEvento}
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
                  value={idTipoEvento}
                  fnManipulator={(e) => {
                    setTiposEvento(e.target.value);
                  }}
                />
                <Button
                  textButton="Cadastrar"
                  id="cadastrar"
                  name="cadastrar"
                  type="submit"
                />
                  </>
                ): (
                  <>
                    <Input
                      id="Nome"
                      placeholder="Nome"
                      name={"nome"}
                      type={"text"}
                      required={"required"}
                      value={nomeEvento}
                      manipulationFunction={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                    />
                    <Input
                      id="Descricao"
                      placeholder="Descricao"
                      name={"descricao"}
                      type={"text"}
                      required={"required"}
                      value={descricao}
                      manipulationFunction={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />
                    <Input
                      id="TipoEvento"
                      placeholder="Tipo Evento"
                      name={"tipoEvento"}
                      type={"text"}
                      required={"required"}
                      value={tiposEvento}
                      manipulationFunction={(e) => {
                        setTiposEvento(e.target.value);
                      }}
                    />
                    <Input
                      id="Data"
                      placeholder="Data"
                      name={"data"}
                      type={"Date"}
                      required={"required"}
                      value={dataEvento}
                      manipulationFunction={(e) => {
                        setDataEvento(e.target.value);
                      }}
                    />
                    <div className="buttons-editbox">
                      <Button
                        textButton={"Atualizar"}
                        id="atualizar"
                        name="atualizar"
                        type="submit"
                        additionalClass={"button-component--middle"}
                      />

                      <Button
                        textButton={"Cancelar"}
                        id="cancelar"
                        name="cancelar"
                        type="button"
                        additionalClass={"button-component--middle"}
                        manipulationFunction={editActionAbort}
                      />
                    </div>
                  </>
                )}
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
