import styled from "styled-components";
import downArrowCalendar from "../images/down-arrow.ico";
import calendar from "../images/calendar.png";
import guests from "../images/guests.png";

const ReservationContainer = styled.section`
  position: absolute;
  display: grid;
  grid-template-rows: 0 1fr 1fr 1fr1 1fr;
  gap: 5vh;
  place-items: center;
  padding-block: 50px;
  width: 1000px;
  max-width: calc(100% - 65px);
  max-height: 600px;
  overflow-y: scroll;
  z-index: 150;
  background-color: #fff;
  font-size: var(--font-size);
  padding-inline: 1em;

  & h1 {
    font-size: var(--font-size-bigger);
  }
  & h2 {
    text-align: center;
  }

  & #lunchHours,
  & #dinerHours {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
  }
  .hours {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & #finalCase {
    position: relative;
    display: grid;
    place-items: center;
    grid-template-columns: auto auto;
    gap: 50px;
    & p:hover {
      cursor: pointer;
    }

    &:has(div) button {
      grid-area: 2 / 1 / 3 / 3;
    }

    @media screen and (max-width: 480px) {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  @media screen and (max-width: 600px) {
    gap: 2vh;
  }

  @media screen and (max-height: 900px) {
    max-height: 60vh;
  }
`;

const OptionsReserv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  column-gap: 5cqw;
  gap: 3cqh 10vw;

  & input {
    position: relative;
    background-color: var(--darker-color);
    color: #fff;
    border: none;
    height: 30px;
    width: clamp(200px, 100%, 250px);
    text-align: center;
    &::placeholder {
      color: var(--color-whiteless);
    }

    &[type="date"] {
      min-width: 100%;
    }
  }
  & span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(25%, 25%);
    background: url(${guests});
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    z-index: 50;
  }

  & #email::placeholder,
  & #name::placeholder {
    color: var(--color-whiteless);
  }

  & #date {
    &::-webkit-calendar-picker-indicator {
      background: url(${downArrowCalendar});
      background-size: cover;
      width: 20px;
      height: 20px;

      &:hover {
        cursor: pointer;
      }
    }
    &::before {
      position: absolute;
      content: "";
      width: 4cqh;
      left: 0;
      height: 100%;
      background: url(${calendar});
      background-size: 50%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const HoursList = styled.ul`
  display: flex;
  column-gap: 2cqw;
  row-gap: 3cqh;
  font-size: var(--font-size-reg);
  flex-wrap: wrap;
  padding-inline: 5em;
  max-width: 100%;

  & button {
    background-color: var(--primary-color);
    color: inherit;
    border-radius: 5px;
    font-size: var(--font-size);
    transition: 0.2s ease-out;

    &.selected {
      filter: brightness(70%);
    }
  }

  @media screen and (max-width: 600px) {
    padding-inline: 2em;
  }
`;

export { OptionsReserv, ReservationContainer, HoursList };
