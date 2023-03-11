import styled from "styled-components";
const EditCarteContainer = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  padding-block: 50px;
  width: 1000px;
  min-height: 60vh;
  max-width: 100%;
  z-index: 150;
  background-color: #fff;

  & > div:first-child {
    grid-area: 1 / 1 / 2 / 3;
  }
  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding-inline: 1em;
    height: 100%;
  }
  & button {
    grid-area: 3 / 1 / 4 / 3;
    width: fit-content;
  }
`;
const HoursContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  font-size: var(--font-size);

  .format {
    transition: 0.5s ease-in;
    color: red;
    font-size: var(--font-size-reg);
  }

  & table {
    display: grid;
    border-collapse: separate;
    gap: 3vh;
    & thead {
      background-color: var(--darker-color);
      border-radius: 10px;
      color: #fff;
      tr {
        text-align: center;
        & td {
          padding: 1em 2em;
        }
      }
    }

    & tbody {
      display: grid;
      gap: 3vh;
      & tr {
        width: 100%;
        display: grid;
        grid-template-columns: 15% 1fr 1fr;
        align-items: center;
        text-align: center;

        & td:nth-child(n + 2):hover {
          cursor: pointer;
        }
      }
    }
  }

  .ctaEdit {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    & button {
      display: grid;
      place-items: center;
      padding: 0.5em;
      border-radius: 50%;
    }
  }
`;
const ImgWrapper = styled.article`
  .imgGalery {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    text-align: center;

    & div {
      font-size: var(--font-size-reg);
      display: flex;
      width: 100%;
      border-radius: 10px;

      & p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding-inline: 2em;
      }
      & img {
        width: clamp(150px, 13vw, 200px);
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 10px;
      }

      & aside {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
      }
    }
  }
`;
const CarteContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  font-size: var(--font-size);
  text-align: center;

  & h2 {
    font-size: var(--font-size-bigger);
  }

  width: 100%;
  & .content {
    display: flex;
    gap: 50px;

    & > div > div {
      height: 100px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 1em;

      & h3 {
        grid-area: 1 / 1 / 2 / 2;
      }
      & p:nth-child(2) {
        grid-area: 2 / 1 / 3 / 2;
        color: var(--darker-color);
      }
      & p:nth-child(3) {
        grid-area: 1 / 2 / 3 / 3;
      }
    }
  }
`;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: clamp(20px, 20vh, 200px);
  padding-block: 150px;
  text-align: center;

  & h1 {
    font-size: var(--font-size-h1);
  }

  & h2 {
    font-size: var(--font-size-reg);
  }
`;

export {
  EditCarteContainer,
  HoursContainer,
  ImgWrapper,
  CarteContainer,
  Wrapper,
};
