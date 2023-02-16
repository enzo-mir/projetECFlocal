import React, { useState } from "react";
import { Overlay } from "../../assets/style/overlay";
import {
  LogContainer,
  ContentSignIn,
  ContentLogIn,
} from "../../assets/style/logStyle";
import postCreateAccount from "../../data/postCreateAccount";
import postConnection from "../../data/postConnection";
import { Cross } from "../../assets/style/cross";

const Log = ({ displayPage, togglePage }) => {
  const [page, setPage] = useState(togglePage);
  const [signinName, setSigninName] = useState();
  const [signinEmail, setSigninEmail] = useState();
  const [signinPassword, setSigninPassword] = useState();
  const [signinGuests, setSigninGuests] = useState();
  const [signinAlergy, setSigninAlergy] = useState();
  const [pwdConfirmation, setPwdConfirmation] = useState("");
  const [fromConfirmation, setFormConfirmation] = useState("");

  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginConfirmation, setLoginConfirmation] = useState("");

  let signinData = {
    signinName,
    signinEmail,
    signinPassword,
    signinGuests,
    signinAlergy,
  };

  function submitSignIn(obj, event) {
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
        if (pwdConfirmation === null && values[2]) {
          if (pwdRegex.test(values[2]) && values[2]) {
            if (guestsRegex.test(values[3]) && values[3]) {
              if (alergyRegex.test(values[4])) {
                postCreateAccount(
                  values[0],
                  values[1],
                  values[2],
                  values[3],
                  values[4]
                ).then((data) =>
                  Object.keys(data) == "error"
                    ? setFormConfirmation(Object.values(data))
                    : (setFormConfirmation("Le compte a été créé !"),
                      event != null
                        ? (event.target.style.pointerEvents = "none")
                        : null,
                      setTimeout(() => {
                        displayPage(false);
                        if (event != null)
                          event.target.style.pointerEvents = "auto";
                      }, 2000))
                );
              } else
                setFormConfirmation(
                  "aucuns caractères spéciaux ni numériques dans les alèrgies"
                );
            } else
              setFormConfirmation(
                "le nombres de convives doit être entre 1 et 9 compris"
              );
          } else {
            setFormConfirmation(
              "le mot de passe doit être composé d'une majuscule, minuscule, d'un chiffre et avoir une longueur de 8 charactères"
            );
          }
        } else
          setFormConfirmation(
            pwdConfirmation ? pwdConfirmation : "champs mot de passe vide"
          );
      } else setFormConfirmation("email invalide");
    } else
      setFormConfirmation(
        "le champs nom et vide ou comporte autre choses que des lettres"
      );
  }

  function submitLogin(email, password, event) {
    postConnection(email, password).then((data) =>
      Object.keys(data) == "erreur"
        ? setLoginConfirmation(Object.values(data))
        : Object.keys(data) != "admin"
        ? (setLoginConfirmation("Vous êtes connecté"),
          window.localStorage.getItem("adminLogin")
            ? window.localStorage.clear("adminLogin")
            : null,
          window.localStorage.setItem("userLogin", JSON.stringify(data)),
          (window.location.href = "/"),
          event !== null ? (event.target.style.pointerEvents = "none") : null,
          setTimeout(() => {
            if (event !== null) event.target.style.pointerEvents = "auto";
            displayPage(false);
          }, 2000))
        : (window.localStorage.setItem("adminLogin", JSON.stringify(data)),
          (window.location.href = "/admin"),
          displayPage(false))
    );
  }

  function contentLoaded(e, currentPage) {
    if (e.code === "Enter") {
      if (currentPage === "sign") submitSignIn(signinData, null);
      if (currentPage === "log") submitLogin(loginEmail, loginPassword, null);
    }
  }
  return (
    <Overlay onClick={() => displayPage(false)}>
      <LogContainer onClick={(e) => e.stopPropagation()}>
        <Cross onClick={() => displayPage(false)} />
        {page === "signin" ? (
          <>
            <h1>Inscrivez-vous</h1>
            {fromConfirmation ? <p>{fromConfirmation}</p> : null}
            <ContentSignIn onKeyUp={(e) => contentLoaded(e, "sign")}>
              <div className="profil">
                <input
                  type="text"
                  placeholder="nom"
                  autoComplete="family-name"
                  onChange={(e) => setSigninName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="adresse e-mail"
                  autoComplete="email"
                  onChange={(e) => setSigninEmail(e.target.value)}
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  placeholder="mot de passe"
                  onChange={(e) => {
                    setSigninPassword(e.target.value);
                    e.target.value !== e.target.parentNode.children[1].value
                      ? setPwdConfirmation(
                          "le mot de passe et la confiramtion du mot de passe ne correspondent pas"
                        )
                      : setPwdConfirmation(null);
                  }}
                />
                <input
                  type="password"
                  placeholder="confirmation mot de passe"
                  onChange={(e) => {
                    e.target.value !== e.target.parentNode.firstChild.value
                      ? setPwdConfirmation(
                          "le mot de passe et la confiramtion du mot de passe ne correspondent pas"
                        )
                      : setPwdConfirmation(null);
                  }}
                />
              </div>
              <div className="adds">
                <input
                  type="number"
                  min="1"
                  max="9"
                  placeholder="convives par défaut (1-9)"
                  onChange={(e) => setSigninGuests(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="alergies (ex : tomates, carotte)"
                  onChange={(e) => setSigninAlergy(e.target.value)}
                />
              </div>
            </ContentSignIn>
            <div className="ctaLog">
              <button onClick={(e) => submitSignIn(signinData, e)}>
                Créer un compte
              </button>
              <p
                onClick={() => {
                  setPage("login");
                  setFormConfirmation("");
                  setPwdConfirmation("");
                  setSigninAlergy("");
                  setSigninEmail("");
                  setSigninGuests("");
                  setSigninName("");
                  setSigninPassword("");
                }}
              >
                vous avez déjà un compte ? connectez-vous
              </p>
            </div>
          </>
        ) : page === "login" ? (
          <>
            <h1>Connectez-vous</h1>
            {loginConfirmation ? <p>{loginConfirmation}</p> : null}

            <ContentLogIn onKeyUp={(e) => contentLoaded(e, "log")}>
              <input
                type="text"
                placeholder="adresse e-mail"
                autoComplete="email"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="mot de passe"
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </ContentLogIn>
            <div className="ctaLog">
              <button
                onClick={(e) => {
                  submitLogin(loginEmail, loginPassword, e);
                }}
              >
                Connection
              </button>
              <p
                onClick={() => {
                  setPage("signin");
                  setLoginConfirmation("");
                  setLoginEmail("");
                  setLoginPassword("");
                }}
              >
                vous n'avez pas encore de compte ? créez un compte
              </p>
            </div>
          </>
        ) : null}
      </LogContainer>
    </Overlay>
  );
};

export default Log;
