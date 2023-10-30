import React from "react";
import './CardEvento.css'

const CardEvento = (props) => {
    return (
        <div className="card-evento">
            <h3 className="card-evento__titulo">{props.titulo}</h3>
            <p className="card-evento__text">{props.descricao}</p>
            <a href="" className="card-evento__conection">{props.link}</a>
        </div>
    )
}

export default CardEvento;