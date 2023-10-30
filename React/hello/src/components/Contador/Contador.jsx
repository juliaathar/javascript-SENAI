// atalho rsc pra criar a estrutura

import React, { useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);

  function handleIncrementar() {
    setContador(contador + 1);
  }

  function handleDecrementar() {
    setContador(contador - 1);
  }

  return (
    <div>
      <h1>Contador</h1>

      <p>{contador}</p>
      <button className="button" onClick={() => handleIncrementar()}>Incrementar</button>
      <button className="button" onClick={() => handleDecrementar()}>Decrementar</button>
    </div>
  );
};

export default Contador;
