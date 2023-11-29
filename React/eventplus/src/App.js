import Rotas from "./routes";
import "./App.css";
import { UserContext } from "./context/AuthContext";
import { useState } from "react";
// importa nosso app encapsulado pelo sistema de roteamento
const App = () => {
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
};

export default App;
