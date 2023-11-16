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

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);

  useEffect(() => {
    //define a chamada em nossa api
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
      }
    }
    //chama a função/api no carregamento da página/componente
    loadEventsType();
  }, [tipoEventos]);

  function handleUpdate() {
    alert("Bora editar");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      alert("Digite mais que 3 caracteres");
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });

      alert("Deu bom");
    } catch (error) {
      alert("Deu ruim no submit");
    }
  }

  //apaga o tipo de evento na api
  async function handleDelete(idTipoEvento) {

    if(!window.confirm("Confirma a exclusão?")){
      return;
    }

    try {
      const promise = await api.delete(`${eventsTypeResource}/ ${idTipoEvento}`);

      if (promise.status == 204) {
        alert("Cadastro apagado com sucesso")
        setTipoEventos([]);
      }
    } catch (error) {
      alert("deu ruim");
    }
  }

  //exibe o formulário de edição
  function showUpdateForm() {
    alert("Vamos mostrar o formulário de edição de dados");
  }

  //cancela a tela de edição (volta pra o form de cadastro)
  function editActionAbort() {
    alert("Cancelar a tela de edição de dados");
  }

  return (
    <>
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
                  <p> Tela de Edição</p>
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
