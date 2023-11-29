import React, { useContext, useState } from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import EventosPage from "./pages/EventosPage/EventosPage";
import HomePage from "./pages/HomePage/HomePage";
import TipoEventosPage from "./pages/TipoEventosPage/TipoEventosPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestePage from "./pages/TestePage/TestePage";
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";
import TestePageCopy from "./pages/TestePage copy/TestePageCopy";


const Rotas = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route element={<HomePage/>} path={"/"} exact/>
        <Route element={<EventosPage/>} path={"/eventos"}/>
        <Route element={<TipoEventosPage/>} path={"/tiposeventos"}/>
        <Route element={<LoginPage/>} path={"/login"}/>
        <Route element={<TestePage/>} path={"/teste"}/>
        <Route element={<TestePageCopy/>} path={"/testecopy"}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default Rotas;
