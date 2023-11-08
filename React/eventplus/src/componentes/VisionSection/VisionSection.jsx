import React from "react";
import Titulo from "../Titulo/Titulo";
import "./VisionSection.css";

const VisionSection = () => {
  return (
    <section className="vision">
      <div className="vison__box">
        <Titulo titleText={"Visão"} additionalClass="vision__title" />
        <p className="vision__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          veritatis dolorem eos amet doloremque consequuntur ad et soluta
          quidem! Praesentium assumenda itaque ex. Unde nulla in voluptas at
          soluta sit!
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
