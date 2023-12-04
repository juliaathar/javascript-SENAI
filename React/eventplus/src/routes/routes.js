import React, { useContext, useState } from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import EventosPage from "../pages/EventosPage/EventosPage";
import HomePage from "../pages/HomePage/HomePage";
import TipoEventosPage from "../pages/TipoEventosPage/TipoEventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TestePage from "../pages/TestePage/TestePage";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/Footer/Footer";
import TestePageCopy from "../pages/TestePage copy/TestePageCopy";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";



const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={"/"} exact />
        <Route
          element={
            <PrivateRoute>
              <EventosPage />
            </PrivateRoute>
          }
          path={"/eventos"}
        />
        <Route
          element={
            <PrivateRoute>
              <EventosAlunoPage />
            </PrivateRoute>
          }
          path={"/eventos-aluno"}
        />
        <Route
          path="/tiposeventos"
          element={
            <PrivateRoute>
              <TipoEventosPage />
            </PrivateRoute>
          }
        />
        <Route element={<LoginPage />} path={"/login"} />
        <Route element={<TestePage />} path={"/teste"} />
        <Route element={<TestePageCopy />} path={"/testecopy"} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
