import React from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import EventosPage from "./pages/EventosPage/EventosPage";
import HomePage from "./pages/HomePage/HomePage";
import TipoEventosPage from "./pages/TipoEventosPage/TipoEventosPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TestePage from "./pages/TestePage/TestePage";
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";


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
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default Rotas;
