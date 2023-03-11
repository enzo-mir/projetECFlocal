import React, { useEffect, useState } from "react";
import heroImage from "../assets/images/heroImage.jpg";
import Reserv from "./components/Reserv";
import { query } from "../data/fetchAllData";
import { userData } from "../data/Connect";

import {
  Wrapper,
  HeroSection,
  ContextText,
  SectionPlats,
} from "../assets/style/homeStyle";
import Loading from "./Loading";

const Home = () => {
  const [res, setRes] = useState(false);
  const [imagesApi, setImagesApi] = useState([]);

  if (window.localStorage.getItem("adminLogin"))
    window.localStorage.clear("adminLogin");

  useEffect(() => {
    query().then((image) => setImagesApi(image.image));
    // eslint-disable-next-line no-unused-expressions

  }, []);

  return (
    <>
      {imagesApi.length < 1 ? (
        <Loading />
      ) : (
        <Wrapper>
          {res && <Reserv res={setRes} />}
          <HeroSection>
            <div className="headerPage">
              <img src={heroImage} alt="accueil" loading="lazy" />
              <h1>Le Quai Antique</h1>
            </div>
            <ContextText>
              <p>
                Venez découvrir la Savoie à travers une expérience
                gastronomique, installé à Chambéry, Le Quai Antique saura vous
                satisfaire tout au long de votre repas.
              </p>
            </ContextText>
          </HeroSection>
          <SectionPlats>
            <p>
              Nos plats traditionnels de la Savoie charmeront à coup sûr vos
              papilles gustatives alors qu’attendez-vous ? <br />
              <br />
              Venez à table !
            </p>
            <div className="imagesGalery">
              {imagesApi.length > 0
                ? imagesApi.map((images, id) => {
                    return (
                      <div key={id}>
                        <img src={images.lien} alt="ok" loading="lazy" />
                        <span>
                          <h1>{images.titre}</h1>
                          <p>{images.description}</p>
                        </span>
                      </div>
                    );
                  })
                : null}
            </div>
            <button className="btnReserve" onClick={() => setRes(true)}>
              Réservez une table
            </button>
          </SectionPlats>
        </Wrapper>
      )}
    </>
  );
};

export default Home;
