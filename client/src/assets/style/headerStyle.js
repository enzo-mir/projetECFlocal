import styled from "styled-components";
import hamburgerBtn from "../images/barre-de-menu.png";

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  background-color: var(--primary-color);
  z-index: 50;

  & .imgContainer {
    padding: 1em;
  }
`;
const BtnMenu = styled.span`
  position: absolute;
  display: none;
  width: 32px;
  height: 32px;
  background-image: url("${hamburgerBtn}");
  margin: 2em 1em;
  right: 0px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & nav {
    margin-left: auto;
    width: max-content;

    & ul {
      display: flex;
      justify-content: center;
      column-gap: 3vw;
      & li {
        display: grid;
        place-items: center;
        font-size: var(--font-size);
        & a {
          color: var(--darker-color);
          text-decoration: none;
          &.active {
            text-decoration: underline;
            text-underline-offset: 10px;
          }
        }
      }
    }
  }

  & #profil {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    font-size: var(--font-size-bigger);
  }

  & .profil {
    margin-left: auto;
    display: flex;
    justify-content: center;
    column-gap: 2vw;
    padding-inline: 1em;
  }

  @media screen and (max-width: 600px) {
    background-color: var(--primary-color);
    position: absolute;
    top: 100px;
    flex-direction: column;
    row-gap: 3vh;
    padding-block: 0em;
    height: 0;
    overflow: hidden;
    transition: all 0.15s ease;

    &.display {
      transition: all 0.3s ease;
      height: 265px;
      padding-block: 1em;
    }

    a,
    button {
      font-size: var(--font-size-reg);
    }

    nav {
      margin-inline: auto;
      margin-top: auto;
      ul {
        flex-direction: column;
        row-gap: 3vh;
      }
    }

    .profil {
      margin-inline: auto;
      flex-direction: column;
      row-gap: 3vh;
      padding: 0;
    }
  }
`;

export { Wrapper, BtnMenu, HeaderContainer };
