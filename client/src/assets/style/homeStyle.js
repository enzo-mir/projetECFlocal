import styled from "styled-components";
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 10vh;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20vh;

  & .headerPage {
    position: relative;
    width: 100%;
    height: 60vh;
    display: grid;
    place-items: center;
    background-color: var(--darker-color-a70);

    & img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
      object-fit: cover;
      user-select: none;
    }
    & h1 {
      font-size: var(--font-size-h1);
      color: #fff;
      border-radius: 10px;
      padding: 1rem;
      user-select: text;
    }
  }
`;

const ContextText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 50px;
    background-color: var(--darker-color);
    z-index: -1;
  }

  & p {
    font-size: var(--font-size-bigger);
    width: 60%;
    border-radius: 10px;
    text-align: center;
    background-color: var(--primary-color);
    line-height: 200%;
    padding: 1.5em 1em;
  }
`;

const SectionPlats = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
  row-gap: 10vh;
  width: clamp(300px, 80%, 1400px);

  & .imagesGalery {
    display: grid;
    width: 100%;
    grid-area: 1 / 1 / 3 / 2;
    grid-template-columns: repeat(auto-fit, minmax(150px, 250px));
    place-items: center;
    justify-content: center;
    margin-bottom: auto;
    gap: 25px;

    & div {
      position: relative;
      text-align: center;

      &:hover {
        & span {
          color: #fff;
        }
        & img {
          filter: brightness(50%);
        }
      }
      span {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: clamp(5px, 1vw, 20px);
        color: transparent;
        transition: 0.15s ease-out;
        font-size: var(--font-size);
        width: 100%;
      }
    }
    & img {
      width: 100%;
      width: clamp(150px, 13vw, 250px);
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: 10px;
      transition: 0.15s ease-out;
    }
    @media screen and (max-width: 600px) {
      width: 100%;
      grid-template-columns: 100%;
    }
  }

  & > p {
    width: 100%;
    grid-area: 1 / 2 / 2 / 3;
    text-align: center;
    font-size: var(--font-size);
    background-color: var(--primary-color);
    padding: 1em;
    line-height: 150%;
    border-radius: 10px;
  }
  & button {
    grid-area: 2 / 2 / 3 / 3;
    margin-bottom: auto;
    padding: 1em 0.5em;
    font-size: var(--font-size);
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export { Wrapper, HeroSection, ContextText, SectionPlats };
