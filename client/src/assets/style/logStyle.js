import styled from "styled-components";

const LogContainer = styled.section`
position: absolute;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
gap: 30px;
padding-block: 25px;
width: 1000px;
min-height: 60%;
max-width: 100%;
z-index: 150;
background-color: #fff;

  & p {
    text-align: center;
  }

  & h1 {
    font-size: var(--font-size-bigger);
    text-align: center;
  }
  .ctaLog {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;

    p {
      font-size: var(--font-size-little);
      color: var(--darker-color);
      text-decoration: underline;
      :hover {
        cursor: pointer;
      }
    }

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  }
`;

const ContentSignIn = styled.div`
  display: grid;
  place-items: center;
  row-gap: 4vh;

  & .adds {
    padding-block: 50px;
    input {
      border: 1px solid var(--darker-color);
    }
  }

  div {
    display: flex;
    column-gap: 3vw;
    width: 80%;

    input {
      background-color: var(--primary-color);
      border: none;
      padding: 0.5rem 1em;
      font-size: var(--font-size);
      width: 50%;
    }
  }
`;
const ContentLogIn = styled.div`
  display: grid;
  place-items: center;
  gap: 5vh;

  input {
    background-color: var(--primary-color);
    border: none;
    padding: 0.5rem 1em;
    font-size: var(--font-size);
  }

  & > div {
    display: flex;
    column-gap: 3vw;
    height: 100%;
  }
`;

export { LogContainer, ContentSignIn, ContentLogIn };
