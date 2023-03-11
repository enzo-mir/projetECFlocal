import React, { useState, useEffect } from "react";
import { query } from "../data/fetchAllData";
import editBtn from "../assets/images/edit_btn.png";
import adminHoursPost from "../data/adminHoursPost";
import { carteQuery } from "../data/fetchCarteData";
import { Overlay } from "../assets/style/overlay";
import postUpdateCarte from "../data/postUpdateCarte";
import AdminEditImages from "./components/AdminEditImages";
import {
  EditCarteContainer,
  HoursContainer,
  ImgWrapper,
  CarteContainer,
  Wrapper,
} from "../assets/style/adminStyle";
import Loading from "./Loading";
import { Cross } from "../assets/style/cross";

const Admin = () => {
  const [fet, setFet] = useState([]);
  const [carteData, setCarteData] = useState();
  const [entree, setEntree] = useState();
  const [plat, setPlat] = useState();
  const [dessert, setDessert] = useState();
  const [menu, setMenu] = useState();
  const [hoursEdit, setHoursEdit] = useState(false);
  const [displayEditCarte, setDisplayEditCarte] = useState(false);
  const [titleCarteEdition, setTitleCarteEdition] = useState("");
  const [descCarteEdition, setDescCarteEdition] = useState("");
  const [priceCarteEdition, setPriceCarteEdition] = useState("");
  const [errorEditingCarte, setErrorEditingCarte] = useState(false);
  const [imagesApi, setImagesApi] = useState([]);
  const [displayEditImage, setDisplayEditImage] = useState(false);
  const [imagesEditTitle, setImageEditTitle] = useState();
  const [imagesEditDesc, setImageEditDesc] = useState();
  const [imagesEditUrl, setImageEditUrl] = useState();
  const [addImage, setAddImage] = useState();
  const [errorHour, setErrorHour] = useState(false);

  useEffect(() => {
    query().then((data) => {
      setFet(data.heures);
      setImagesApi(data.image);
    });
    carteQuery().then((data) => {
      setCarteData(data);
      setEntree(data.entree);
      setPlat(data.plat);
      setDessert(data.dessert);
      setMenu(data.menu);
    });
  }, []);

  const EditingCarteComponents = () => {
    useEffect(() => {
      return () => {
        document.body.removeAttribute("style");
      };
    }, []);

    document.body.style.overflow = "hidden";

    return (
      <Overlay
        onClick={() => {
          setDisplayEditCarte(false);
          setErrorEditingCarte(false);
        }}
      >
        <EditCarteContainer onClick={(e) => e.stopPropagation()}>
          <div>
            <Cross
              style={{ position: "absolute" }}
              onClick={() => {
                setDisplayEditCarte(false);
                setErrorEditingCarte(false);
              }}
            />
            <h1>Édition de la carte</h1>
            {errorEditingCarte && <p>{errorEditingCarte}</p>}
          </div>
          <div>
            <p>titre : {titleCarteEdition}</p>
            {descCarteEdition ? (
              <>
                <p>
                  description :{" "}
                  <strong style={{ textAlign: "center" }}>
                    {descCarteEdition}
                  </strong>
                </p>
                <p>prix : {priceCarteEdition}</p>
              </>
            ) : (
              <p>formule : {priceCarteEdition}</p>
            )}
          </div>
          <div>
            <input type="text" />
            {descCarteEdition ? (
              <>
                <input type="text" />
                <input type="number" min="0" />
              </>
            ) : (
              <input type="text" />
            )}
          </div>
          <button
            onClick={(e) => {
              e.target.parentNode
                .querySelectorAll("input")
                .forEach((inputs) => {
                  if (inputs.value === "") {
                    setErrorEditingCarte("erreur : champs non-remplis");
                  } else {
                    descCarteEdition
                      ? postUpdateCarte(
                          titleCarteEdition,
                          descCarteEdition,
                          e.target.parentNode.children[2].firstChild.value,
                          e.target.parentNode.children[2].children[1].value,
                          e.target.parentNode.children[2].children[2].value,
                          null
                        )
                      : postUpdateCarte(
                          titleCarteEdition,
                          descCarteEdition,
                          e.target.parentNode.children[2].firstChild.value,
                          null,
                          null,
                          e.target.parentNode.children[2].children[1].value
                        );
                    window.location.reload();
                    setErrorEditingCarte(false);
                  }
                });
            }}
          >
            Fin de l'édition
          </button>
        </EditCarteContainer>
      </Overlay>
    );
  };

  function editingHours(event, text, day, time) {
    let element = document.createElement("input");
    element.classList.add(time);
    element.setAttribute("id", day);
    element.value = text;
    event.target.parentNode.replaceChild(element, event.target);
  }

  function submitEdition(elem) {
    let data = [];
    elem.forEach((element) => {
      let day = elem[0].parentElement.firstChild.textContent;
      let time = element.getAttribute("class");
      data.push({ day: day, time: time, target: element.value });
    });
    let test;
    for (let i = 0; i < elem.length; i++) {
      let hourRegexe = new RegExp(
        /^(fermer)|([0-1][0-9]|2[0-4])h([1-5][0-9]|60|0[1-9]|[1-9]0)? - ([0-1][0-9]|2[0-4])h([1-5][0-9]|60|0[1-9]|[1-9]0)?$/dgim
      );
      const inputs = elem[i];
      test = hourRegexe.test(inputs.value);
    }

    if (test) {
      setErrorHour(false);
      adminHoursPost(data);
      window.location.reload();
    } else setErrorHour(true);
  }

  function editableCarte(event) {
    let title = event.target.parentNode.firstChild.textContent;
    let desc = event.target.parentNode.children[1].textContent;
    let price = event.target.parentNode.children[2].textContent;
    setTitleCarteEdition(title);
    setDescCarteEdition(desc);
    setPriceCarteEdition(price);
    setDisplayEditCarte(true);
  }

  function imageEdit(event) {
    let parentElement = event.target.parentNode.parentNode;
    let imagesComponents = parentElement.querySelector("p");
    let image = parentElement.querySelector("img");
    let contentTarget = imagesComponents.textContent;

    setImageEditUrl(image.getAttribute("src"));
    setImageEditTitle(
      contentTarget.slice(
        contentTarget.indexOf(":") + 2,
        contentTarget.indexOf("Description :")
      )
    );
    setImageEditDesc(
      contentTarget.slice(
        contentTarget.indexOf(":", contentTarget.indexOf(":") + 1) + 2
      )
    );
    setAddImage(false);
    setDisplayEditImage(true);
  }

  async function handleDelet(e) {
    let parentElement = e.target.parentNode.parentNode;
    let url = parentElement.querySelector("img").getAttribute("src");

    let postDataImage = fetch("/adminImageDeleted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Connection: "keep-alive",
        Accept: "*",
      },
      body: JSON.stringify({
        titre: null,
        desc: null,
        oldUrl: url,
        newUrl: null,
        pubId: null,
      }),
    });
    await postDataImage.then(window.location.reload());
  }

  function imageAdd(event) {
    setImageEditUrl(null);
    setImageEditTitle("");
    setImageEditDesc("");
    setAddImage(true);
    setDisplayEditImage(true);
  }

  return (
    <>
      {!fet ||
      fet.length < 1 ||
      !carteData ||
      !imagesApi ||
      imagesApi.length < 1 ? (
        <Loading />
      ) : (
        <Wrapper>
          {displayEditImage && (
            <AdminEditImages
              title={imagesEditTitle}
              description={imagesEditDesc}
              url={imagesEditUrl}
              displaying={setDisplayEditImage}
              adding={addImage}
            />
          )}
          <ImgWrapper>
            <h1>Galerie d'images</h1>
            <div className="imgGalery">
              {imagesApi.map((images, id) => {
                return (
                  <div key={id}>
                    <img src={images.lien} alt="plats du chef" />
                    <p>
                      Titre : {images.titre}
                      <br />
                      <br />
                      Description : {images.description}
                    </p>
                    <aside>
                      <button onClick={(e) => imageEdit(e)}>Éditer</button>
                      <button onClick={(e) => handleDelet(e)}>Supprimer</button>
                    </aside>
                  </div>
                );
              })}
              <button onClick={(e) => imageAdd(e)}>Ajouter +</button>
            </div>
          </ImgWrapper>
          <HoursContainer>
            <h1>Horaires d'ouvertures</h1>
            <p>(Cliquez sur les horaires pour les éditer)</p>
            <p className={errorHour ? "format" : ""}>
              Format horaires, exemples : <br />
              12h - 15h, 12h30 - 15h10, fermer
            </p>
            <table>
              <thead>
                <tr>
                  <td>jour</td>
                  <td>midi</td>
                  <td>soir</td>
                </tr>
                <tr>
                  <td></td>
                  <td>ouverture-fermeture</td>
                  <td>ouverture-fermeture</td>
                </tr>
              </thead>
              <tbody>
                {fet.map((elem, id) => {
                  return (
                    <tr key={id}>
                      <>
                        <td>{elem.day}</td>
                        <td
                          onClick={(e) => {
                            editingHours(
                              e,
                              e.target.textContent,
                              elem.day,
                              "lunch"
                            );
                            setHoursEdit(true);
                          }}
                        >
                          {elem.lunch}
                        </td>
                        <td
                          onClick={(e) => {
                            editingHours(
                              e,
                              e.target.textContent,
                              elem.day,
                              "dinner"
                            );
                            setHoursEdit(true);
                          }}
                        >
                          {elem.dinner}
                        </td>
                      </>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {hoursEdit ? (
              <div className="ctaEdit">
                <p>Édition finit</p>
                <button
                  onClick={() =>
                    submitEdition(
                      document.querySelectorAll("article table tbody input")
                    )
                  }
                >
                  <img src={editBtn} alt="édition" />
                </button>
              </div>
            ) : null}
          </HoursContainer>
          <CarteContainer>
            {displayEditCarte && <EditingCarteComponents />}
            <h1>Carte du restaurant</h1>
            <h2>Entrées</h2>
            <div className="content">
              {entree ? (
                <>
                  <div className="seul">
                    <h2>Seul</h2>
                    {entree.map((food, id) => {
                      return !food.partage ? (
                        <div key={id}>
                          <h3>{food.nom}</h3>
                          <p>{food.description}</p>
                          <p>{food.prix}€</p>
                          <button onClick={(e) => editableCarte(e)}>
                            <img src={editBtn} alt="edit btn" />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="partage">
                    <h2>Partager</h2>
                    {entree.map((food, id) => {
                      return food.partage ? (
                        <div key={id}>
                          <h3>{food.nom}</h3>
                          <p>{food.description}</p>
                          <p>{food.prix}€</p>
                          <button onClick={(e) => editableCarte(e)}>
                            <img src={editBtn} alt="edit btn" />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </>
              ) : null}
            </div>
            <h2>Plats</h2>
            <div className="content">
              {plat ? (
                <>
                  <div className="seul">
                    <h2>Seul</h2>
                    {plat.map((food, id) => {
                      return !food.partage ? (
                        <div key={id}>
                          <h3>{food.nom}</h3>
                          <p>{food.description}</p>
                          <p>{food.prix}€</p>
                          <button onClick={(e) => editableCarte(e)}>
                            <img src={editBtn} alt="edit btn" />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="partage">
                    <h2>Partager</h2>
                    {plat.map((food, id) => {
                      return food.partage ? (
                        <div key={id}>
                          <h3>{food.nom}</h3>
                          <p>{food.description}</p>
                          <p>{food.prix}€</p>
                          <button onClick={(e) => editableCarte(e)}>
                            <img src={editBtn} alt="edit btn" />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </>
              ) : null}
            </div>
            <h2>Desserts</h2>
            <div className="content">
              {dessert ? (
                <div>
                  {dessert.map((food, id) => {
                    return (
                      <div key={id} className="dessert">
                        <h3>{food.nom}</h3>
                        <p>{food.description}</p>
                        <p>{food.prix}€</p>
                        <button onClick={(e) => editableCarte(e)}>
                          <img src={editBtn} alt="edit btn" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
            {menu ? (
              <>
                <h2>Menus</h2>
                <div className="content">
                  <div>
                    {menu.map((food, id) => {
                      return (
                        <div key={id} className="menu">
                          <h3>{food.nom}</h3>
                          <p>{food.description}</p>
                          <p>{food.formule}</p>
                          <button onClick={(e) => editableCarte(e)}>
                            <img src={editBtn} alt="edit btn" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
          </CarteContainer>
          <article>
            <h1>
              Nombre de convives maximum du restaurant <br />
              35 personnes
            </h1>
          </article>
        </Wrapper>
      )}
    </>
  );
};

export default Admin;
