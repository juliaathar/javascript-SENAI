import React, { useContext, useState } from "react";
import ImageIllustrator from "../../componentes/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/images/logo-pink.svg";
import { Input, Button } from "../../componentes/FormComponents/FormComponents";
import loginImage from "../../assets/images/images/login.svg";

import "./LoginPage.css";
import api, { loginResource } from "../../Services/Service";
//recursos do auth context
import { UserContext, userDecodeToken } from "../../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "julia@gmail.com", senha: "" });
  // importa os dados globais do usuario vindos pelo value do provider
  const {userData, setUserData} = useContext(UserContext)
  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email.length > 3 && user.senha.length > 3) {
      try {
        const promise = await api.post(loginResource, {
          email: user.email,
          senha: user.senha,
        });
        //decodifica e guarda na const. 
        const userFullToken = userDecodeToken(promise.data.token)

        //guarda o token globalmente
        setUserData(userFullToken)
        localStorage.setItem("token", JSON.stringify(userFullToken))


      } catch (error) {
        //erro da api
        alert("verifique os dados e a conexao com a internet");
      }
    } else {
      alert("preencha os dados corretamente");
    }
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator"
            imageRender={loginImage}
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              className="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              fnManipulator={(e) => {
                setUser({ ...user, email: e.target.value.trim() });
              }}
              placeholder="Username"
            />
            <Input
              additionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              fnManipulator={(e) => {
                setUser({ ...user, senha: e.target.value.trim() });
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
              fnManipulator={() => {}}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
