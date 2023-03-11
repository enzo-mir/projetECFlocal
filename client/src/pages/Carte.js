import React, { useEffect, useState } from "react";
import { carteQuery } from "../data/fetchCarteData";
import Reserv from "./components/Reserv";
import {
  CarteContainer,
  MenuContainer,
  LunchSection,
  PlatSection,
  DessertSection,
  MenuSection,
} from "../assets/style/carteStyle";
import Loading from "./Loading";

export default function Carte() {
  const [carteFetched, setCarteFetched] = useState();
  const [entree, setEntree] = useState();
  const [plat, setPlat] = useState();
  const [dessert, setDessert] = useState();
  const [menu, setMenu] = useState();
  const [res, setRes] = useState(false);

  if (window.localStorage.getItem("adminLogin"))
    window.localStorage.clear("adminLogin");

  useEffect(() => {
    carteQuery().then((data) => {
      setCarteFetched(data);
      setEntree(data.entree);
      setPlat(data.plat);
      setDessert(data.dessert);
      setMenu(data.menu);
    });
  }, []);
  function mapingSimilarityFood(food, title) {
    return food === entree || food === plat ? (
      <>
        <h2>{title}</h2>
        <div className="noshare">
          {food.map((element, id) => {
            return !element.partage ? (
              <div key={id}>
                <div>
                  <p>{element.nom}</p>
                  <p className="desc">{element.description}</p>
                </div>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
        <div className="share">
          <h2>à partager (ou pas . . .)</h2>
          {food.map((element, id) => {
            return element.partage ? (
              <div key={id}>
                <div>
                  <p>{element.nom}</p>
                  <p className="desc">{element.description}</p>
                </div>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
      </>
    ) : food === dessert ? (
      <>
        <h2>{title}</h2>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <div>
                <p>{element.nom}</p>
                <p className="desc">{element.description}</p>
              </div>
              <p>{element.prix}€</p>
            </div>
          );
        })}
      </>
    ) : (
      <>
        <h2>{title}</h2>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <p>{element.nom}</p>
              <article>
                <p>Formules : </p>
                <aside>
                  {element.formule.split(",").map((formule, index) => {
                    return <div key={index}>{formule}</div>;
                  })}
                </aside>
              </article>
            </div>
          );
        })}
      </>
    );
  }

  return carteFetched !== undefined ? (
    <>
      {res && <Reserv res={setRes} />}
      <CarteContainer>
        <h1>La carte</h1>
        <MenuContainer>
          <LunchSection>
            {mapingSimilarityFood(entree, "les entrées")}
          </LunchSection>
          <PlatSection>{mapingSimilarityFood(plat, "les plats")}</PlatSection>
          <DessertSection>
            {mapingSimilarityFood(dessert, "les desserts")}
          </DessertSection>
          <MenuSection>{mapingSimilarityFood(menu, "les menus")}</MenuSection>
        </MenuContainer>
      </CarteContainer>
    </>
  ) : (
    <Loading />
  );
}
