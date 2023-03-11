import React, { useEffect } from "react";
import styled from "styled-components";

const UndifinedRoute = () => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  document.body.style.overflow = "hidden";
  return (
    <Wrapper>
      <h1>Error 404 : page introuvable</h1>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding-block: 150px;
  background: var(--color-blackless);
  & h1 {
    position: relative;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(
        circle at 100% 50%,
        var(--primary-color) 20%,
        var(--darker-color) 21%,
        var(--darker-color) 34%,
        var(--primary-color) 35%,
        var(--primary-color)
      ),
      radial-gradient(
          circle at 0% 50%,
          var(--primary-color) 20%,
          var(--darker-color) 21%,
          var(--darker-color) 34%,
          var(--primary-color) 35%,
          var(--primary-color)
        )
        10px -30px;
    background-size: 50px 50px;
    -webkit-background-clip: text;
    color: transparent;
    font-size: var(--font-size-h1);
  }
`;
export default UndifinedRoute;
