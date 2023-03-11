import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "../components/Log";
import {
  Wrapper,
  HeaderContainer,
  BtnMenu,
} from "../../assets/style/headerStyle";
import ProfilComponent from "./ProfilComponent";
import Reserv from "./Reserv";
import dataJWT from "../../data/dataJWT";

const Header = ({ isConnected, display }) => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [res, setRes] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    typeof window.localStorage.getItem("userToken") === "string"
      ? dataJWT().then(async (data) => {
          setUserInfo(await data);
        })
      : null;
  }, []);

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
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/carte"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Carte
              </NavLink>
            </li>
            <li>
              <button className="btnReserve" onClick={() => setRes(true)}>
                Réserver
              </button>
            </li>
          </ul>
        </nav>
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
              {userInfo && userInfo.userName.charAt(0)}
            </button>
          )}
        </div>
      </HeaderContainer>
    );
  };

  return display ? (
    <>
      {logPage && <Log displayPage={setLogPage} togglePage={togglePage} />}
      {profilPage && (
        <ProfilComponent displayProfil={setProfilPage} userData={userInfo} />
      )}
      {res && <Reserv res={setRes} />}

      <Wrapper>
        <div className="imgContainer">
          <Link to="/">
            <img src={icon} alt="Icon du site" />
          </Link>
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

export default Header;
