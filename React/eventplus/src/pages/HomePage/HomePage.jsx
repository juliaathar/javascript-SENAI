import React from "react";
import Banner from "../../componentes/Banner/Banner";
import MainContent from "../../componentes/Main/MainContent";
import Titulo from "../../componentes/Titulo/Titulo";
import VisionSection from "../../componentes/VisionSection/VisionSection";

const HomePage = () => {
  return (
      <MainContent>
              <Banner/>
        <VisionSection/>
      </MainContent>
  );
};

export default HomePage;
