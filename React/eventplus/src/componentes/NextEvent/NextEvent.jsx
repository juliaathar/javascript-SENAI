import React from "react";
import "./NextEvent.css";
import { Tooltip } from 'react-tooltip'
import {dateFormatDbToView} from "../../Utils/stringFunction"

const NextEvent = ({ title, description, eventDate, idEvent }) => {

  function conectar(idEvent) {
    alert(`Chamar o recurso para conectar: ${idEvent}`);
  }

  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>
      <p 
      className="event-card__description"

      data-tooltip-id={idEvent}
      data-tooltip-content={description}
      data-tooltip-place="bottom"

      > 
      <Tooltip id={idEvent} className="tooltip" />
      {description.substr(0,15)}...
      </p>
      <p className="event-card__description"> {dateFormatDbToView(eventDate)}</p>
      <a
        onClick={() => {
          conectar(idEvent);
        }}
        href="" className="event-card__connect-link"
      >
        Conectar
      </a>
    </article>
  );
};

export default NextEvent;
