import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import trashDelete from "../../../assets/images/images/trash-delete.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunctions";
import ToggleSwitch from "../../../componentes/Toggle/Toggle";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";

import "./TableEvA.css";

const TableEvA = ({ dados, fnConnect = null, fnShowModal = null }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                 {dateFormatDbToView(e.dataEvento)} 
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  idevento={e.idEvento}
                  src={comentaryIcon}
                  alt=""
                  onClick={fnShowModal}
                />

                <ToggleSwitch fnManipulator={fnConnect} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEvA;
