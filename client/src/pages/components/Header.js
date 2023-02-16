import React, { Children, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "../components/Log";
import {
  Wrapper,
  HeaderContainer,
  BtnMenu,
} from "../../assets/style/headerStyle";
import { userData } from "../../data/Connect";
import ProfilComponent from "./ProfilComponent";
import styled from "styled-components";
import Reserv from "./Reserv";

const Header = ({ isConnected, display }) => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [res, setRes] = useState(false);
  const [togglePage, setTogglePage] = useState("");

  document.onmouseup = (e) => {
    let obj = document.querySelector("header");
    let dropDownContent = obj.children[1];
    if (dropDownContent.classList.contains("display")) {
      if (!obj.contains(e.target)) {
        dropDownContent.classList.remove("display");
      }
    }
  };

  const NavMenu = () => {
    return (
      <HeaderContainer>
        <NavContent>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/carte">Carte</Link>
            </li>
            <li>
              <button className="btnReserve" onClick={() => setRes(true)}>
                Réserver
              </button>
            </li>
          </ul>
        </NavContent>
        <div className="profil">
          {!isConnected ? (
            <>
              <button
                className="signIn"
                onClick={() => {
                  setTogglePage("signin");
                  setLogPage(true);
                }}
              >
                Inscription
              </button>
              <button
                className="logIn"
                onClick={() => {
                  setLogPage(true);
                  setTogglePage("login");
                }}
              >
                Connexion
              </button>
            </>
          ) : (
            <button id="profil" onClick={() => setProfilPage(true)}>
              {userData.userName.charAt(0)}
            </button>
          )}
        </div>
      </HeaderContainer>
    );
  };

  return display ? (
    <>
      {logPage && <Log displayPage={setLogPage} togglePage={togglePage} />}
      {profilPage && <ProfilComponent displayProfil={setProfilPage} />}
      {res && <Reserv res={setRes} />}

      <Wrapper>
        <div className="imgContainer">
          <img src={icon} alt="Icon du site" />
        </div>
        <NavMenu />
        <BtnMenu
          onClick={(e) => {
            e.target.parentNode.children[1].classList.toggle("display");
            let elemLink = Object.values(
              e.target.parentNode.children[1].children
            );

            elemLink.map((el) => {
              Object.values(el.querySelectorAll("a")).map((a) => {
                a.onclick = () =>
                  document
                    .querySelector(".display")
                    .classList.remove("display");
              });
              Object.values(el.querySelectorAll("button")).map((button) => {
                button.onclick = () =>
                  document
                    .querySelector(".display")
                    .classList.remove("display");
              });
            });
          }}
        />
      </Wrapper>
    </>
  ) : null;
};

const NavContent = styled.nav``;

export default Header;
