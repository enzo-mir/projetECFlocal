import React, { useEffect, useState } from "react";
import { Overlay } from "../../assets/style/overlay";
import { ContainerSettings } from "../../assets/style/profilComponentsStyle";
import updateProfil from "../../data/updateProfil";
import Log from "./Log";

const ProfilComponent = ({ displayProfil, userData }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(userData.userName);
  const [email, setEmail] = useState(userData.email);
  const [guests, setGuests] = useState(userData.convive);
  const [alergy, setAlergy] = useState(userData.alergie);
  const [validationMessage, setValidationMessage] = useState();
  const [mdp, setMdp] = useState(userData.password);
  let oldEmail = userData.email;
  let oldPassword = userData.password;

  useEffect(() => {
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  document.body.style.overflow = "hidden";

  let updateData = {
    name,
    email,
    mdp,
    guests,
    alergy,
    oldEmail,
    oldPassword,
  };

  function edit(content) {
    return editable === false ? (
      <strong>{content}</strong>
    ) : content === name ? (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    ) : content === email ? (
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    ) : content === guests ? (
      <input
        type="number"
        min="1"
        max="9"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />
    ) : content === alergy ? (
      <input
        type="text"
        value={alergy}
        onChange={(e) => setAlergy(e.target.value)}
      />
    ) : content === mdp ? (
      <input type="text" value={mdp} onChange={(e) => setMdp(e.target.value)} />
    ) : null;
  }

  function validationForm(obj, event) {
    let values = Object.values(obj);
    var nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    var emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    );
    var pwdRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
    var alergyRegex = nameRegex;
    var guestsRegex = new RegExp(/^([1-9])$/);

    if (nameRegex.test(values[0]) && values[0]) {
      if (emailRegex.test(values[1]) && values[1]) {
        if (guestsRegex.test(values[3]) && values[3]) {
          if (alergyRegex.test(values[4])) {
            if (pwdRegex.test(values[2] && values[2])) {
              updateProfil(
                values[0],
                values[1],
                values[2],
                values[3],
                values[4],
                values[5],
                values[6]
              ).then((data) =>
                Object.keys(data) == "erreur"
                  ? setValidationMessage(Object.values(data))
                  : (setValidationMessage("Profil mis a jour"),
                    window.localStorage.setItem(
                      "userToken",
                      JSON.stringify(data.token)
                    ),
                    window.location.reload(),
                    (event.target.style.pointerEvents = "none"),
                    setTimeout(() => {
                      event.target.style.pointerEvents = "auto";
                      displayProfil(false);
                    }, 2000))
              );
            } else {
              setValidationMessage(
                "le mot de passe doit être composé d'une majuscule, minuscule, d'un chiffre et avoir une longueur de 8 charactères"
              );
            }
          } else
            setValidationMessage(
              "aucuns caractères spéciaux ni numériques dans les alèrgies"
            );
        } else
          setValidationMessage(
            "le nombres de convives doit être entre 1 et 9 compris"
          );
      } else setValidationMessage("email invalide");
    } else
      setValidationMessage(
        "le champs nom et vide ou comporte autre choses que des lettres"
      );
  }

  function deletAccount(event) {
    fetch("/deletAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Connection: "keep-alive",
        Accept: "*",
      },
      body: JSON.stringify({
        nom: name,
        email: email,
        convives: guests,
        allergies: alergy,
      }),
    }).then((data) =>
      Object.keys(data) == "erreur"
        ? setValidationMessage(Object.values(data))
        : (setValidationMessage("Profil supprimé"),
          window.localStorage.clear("userLogin"),
          window.location.reload(),
          (event.target.style.pointerEvents = "none"),
          setTimeout(() => {
            event.target.style.pointerEvents = "auto";
            displayProfil(false);
          }, 2000))
    );
  }

  return (
    <Overlay onClick={() => displayProfil(false)}>
      <ContainerSettings onClick={(e) => e.stopPropagation()}>
        {validationMessage ? (
          <p className="error">{validationMessage}</p>
        ) : null}
        <div className="profilAcount">
          <p>nom : {edit(name)}</p>
          <p>e-mail : {edit(email)}</p>
        </div>
        <div className="addsOn">
          <p>convives (par défaut) : {edit(guests)}</p>
          <p>alergies : {edit(alergy)}</p>
        </div>
        <div className="passwordField">
          <p>mot de passe : {edit(mdp)}</p>
        </div>
        <div className="cta">
          {!editable ? (
            <button
              onClick={() => {
                setEditable(!editable);
              }}
            >
              Éditer les infos
            </button>
          ) : (
            <button
              onClick={() => {
                setEditable(!editable);
                validationForm(updateData);
              }}
            >
              Fin de l'édition
            </button>
          )}
          <button
            onClick={() => {
              window.localStorage.clear("userLogin");
              window.location.reload();
            }}
          >
            Déconnection
          </button>
          <button onClick={(e) => deletAccount(e)}>supprimer le compte</button>
        </div>
      </ContainerSettings>
    </Overlay>
  );
};

export default ProfilComponent;
