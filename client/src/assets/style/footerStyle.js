import styled from "styled-components";
export const Wrapper = styled.footer`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: var(--font-size);
  row-gap: 5vh;
  margin-top: 150px;

  & #horaires {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    row-gap: 5vh;
    width: 30%;

    & thead > tr > th {
      position: relative;
      font-size: var(--font-size-bigger);

      &::after,
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 5px;
        background-color: var(--darker-color);
      }

      &::after {
        top: -50%;
        width: 50%;
      }
      &::before {
        bottom: -50%;
        width: 70%;
      }
    }

    & tbody {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      row-gap: 3vh;
      width: 100%;

      & tr {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        place-items: center;
        width: 100%;
      }
    }
  }

  & nav {
    width: 30%;
    & ul {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      column-gap: 2.5vw;
      background-color: var(--primary-color);
      border-radius: 10px;
      padding: 1em;
      & a {
        color: var(--darker-color);
        text-decoration: none;
      }
    }
  }

  & > p {
    font-size: var(--font-size-little);
  }

  @media screen and (max-width: 800px) {
    & nav {
      width: 50%;
    }
    & table#horaires {
      width: 50%;
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    & nav {
      width: 100%;

      & ul {
        width: auto;
      }
    }
    & table#horaires {
      width: 100%;
    }
  }
`;
