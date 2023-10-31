import React from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import EventosPage from "./pages/EventosPage/EventosPage";
import HomePage from "./pages/HomePage/HomePage";
import TipoEventosPage from "./pages/TipoEventosPage/TipoEventosPage";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage/>} path={"/"} exact/>
        <Route element={<EventosPage/>} path={"/eventos"}/>
        <Route element={<TipoEventosPage/>} path={"/tiposeventos"}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
