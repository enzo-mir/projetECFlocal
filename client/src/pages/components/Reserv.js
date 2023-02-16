import React, { useEffect, useState } from "react";
import { query } from "../../data/fetchAllData";
import postReservation from "../../data/postReservation";
import Allergie from "./Allergie";
import { Overlay } from "../../assets/style/overlay";
import {
  OptionsReserv,
  ReservationContainer,
  HoursList,
} from "../../assets/style/reserveStyle";
import { userData } from "../../data/Connect";
import { Cross } from "../../assets/style/cross";

export default function Reserv({ res }) {
  const [fet, setFet] = useState([]);
  const [dayDate, setDayDate] = useState(null);
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [resError, setResError] = useState("");
  const [showAllergy, setShowAllergy] = useState(false);
  const [alergy, setAlergy] = useState();
  const [timeLapsJourney, setTimelapsJourney] = useState();

  useEffect(() => {
    query().then((data) => setFet(data.heures));
    isConnected();
  }, []);

  function handleChangeDate(e) {
    let dateDay = new Date(e.target.value).toLocaleDateString("fr-FR", {
      weekday: "long",
    });

    let fullDate = new Date(e.target.value).toLocaleDateString("fr-CA");

    setDate(fullDate);
    setDayDate(dateDay);
  }
  let lunchTable = ["12h", "12h15", "12h30", "12h45", "13h", "13h15", "13h30"];
  let dinnerTable = ["19h", "19h15", "19h30", "19h45", "20h", "20h15", "20h30"];
  let saturdayTable = [
    "19h",
    "19h15",
    "19h30",
    "19h45",
    "20h",
    "20h15",
    "20h30",
    "21h",
    "21h15",
    "21h30",
  ];

  function unselectHours() {
    document.onmouseup = (e) => {
      let obj = document.querySelector(".selected");
      if (!obj.contains(e.target)) {
        obj.classList.remove("selected");
      }
    };
  }

  function selectHours(e) {
    unselectHours();
    let parentToGetJourney =
      e.target.parentNode.parentNode.parentNode.getAttribute("id");
    let getJourney = parentToGetJourney.slice(
      0,
      parentToGetJourney.indexOf("Hours")
    );
    let oldTarget = document.querySelector(".selected");
    if (oldTarget) oldTarget.removeAttribute("class");
    let target = e.target;
    target.classList.add("selected");
    setTimelapsJourney(getJourney);
  }
  function returnData(time) {
    switch (time) {
      case "12H - 14H":
        return lunchTable.map((lunch, id) => {
          return (
            <button key={id} onClick={selectHours} tabIndex={id}>
              {lunch}
            </button>
          );
        });
      case "19H - 22H":
        return dinnerTable.map((dinner, id) => {
          return (
            <button key={id} onClick={selectHours} tabIndex={id + 7}>
              {dinner}
            </button>
          );
        });
      case "19H - 23H":
        return saturdayTable.map((dinner, id) => {
          return (
            <button key={id} onClick={selectHours} tabIndex={id + 7}>
              {dinner}
            </button>
          );
        });
      case "fermer":
        return time;
      default:
        break;
    }
  }

  const ErrorReservation = () => {
    return <p>{resError}</p>;
  };

  function submitReservation(e) {
    e.target.parentNode.parentNode.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    let hourTargeted = document.querySelector(".selected")
      ? document.querySelector(".selected").textContent
      : null;

    if (guests > 0 && guests < 10) {
      if (date !== null) {
        if (email !== undefined) {
          if (name !== undefined) {
            if (hourTargeted !== null) {
              if (alergy) {
                postReservation(
                  guests,
                  date,
                  email,
                  name,
                  hourTargeted,
                  alergy,
                  timeLapsJourney
                )
                  .then((res) => res.json())
                  .then(async (data) => {
                    await data;
                    console.log(data);
                    if (Object.keys(data) == "error") {
                      setResError(data.error);
                    } else {
                      setResError("Réservation validé !");
                    }
                    e.target.style.pointerEvents = "none";
                    setTimeout(() => {
                      e.target.style.pointerEvents = "auto";
                      res(false);
                    }, 6000);
                  });
              } else {
                setResError("Votre réservation à bien été pris en compte");
                postReservation(guests, date, email, name, hourTargeted, "");
                e.target.style.pointerEvents = "none";

                setTimeout(() => {
                  e.target.style.pointerEvents = "auto";
                  res(false);
                }, 2000);
              }
            } else setResError("Choisissez une heure de réservation");
          } else setResError("Veuillez renseignez un nom de réservation");
        } else setResError("Veuillez renseignez votre adresse e-mail");
      } else setResError("Choisissez une date de réservation");
    } else setResError("Le nombre de convives doit être compris entre 1 et 9");
  }

  function isConnected() {
    if (userData !== null) {
      setGuests(userData.convive);
      setName(userData.userName);
      setEmail(userData.email);
      setShowAllergy(userData.alergie !== "aucune" ? true : false);
      setAlergy(userData.alergie !== "aucune" ? userData.alergie : "");
    }
  }

  return (
    <Overlay onClick={() => res(false)}>
      <ReservationContainer onClick={(e) => e.stopPropagation()}>
        <Cross onClick={() => res(false)} />
        <h1>Réservez votre table</h1>
        {resError ? <ErrorReservation /> : null}
        <OptionsReserv>
          <span></span>
          <input
            type="number"
            id="persons"
            placeholder="convives par défaut (1-9)"
            max="9"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            maxLength="2"
          />
          <input
            type="date"
            id="date"
            onChange={handleChangeDate}
            min={new Date().toLocaleDateString("fr-CA")}
          />
          <input
            type="email"
            id="email"
            required
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) =>
              userData !== null ? null : setEmail(e.target.value)
            }
          />
          <input
            type="text"
            id="name"
            required
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) =>
              userData !== null ? null : setName(e.target.value)
            }
          />
        </OptionsReserv>
        <div id="lunchHours">
          <h2>MIDI</h2>
          <div className="hours">
            <HoursList>
              {fet.map((data) => {
                return data.day === dayDate
                  ? dayDate === "lundi" ||
                    dayDate === "mardi" ||
                    dayDate === "jeudi" ||
                    dayDate === "mercredi" ||
                    dayDate === "vendredi" ||
                    dayDate === "samedi" ||
                    dayDate === "dimanche"
                    ? returnData(data.lunch)
                    : null
                  : null;
              })}
            </HoursList>
          </div>
        </div>
        <div id="dinerHours">
          <h2>SOIR</h2>
          <div className="hours">
            <HoursList>
              {fet.map((data) => {
                return data.day === dayDate
                  ? dayDate === "lundi" ||
                    dayDate === "mardi" ||
                    dayDate === "jeudi" ||
                    dayDate === "mercredi" ||
                    dayDate === "vendredi" ||
                    dayDate === "samedi" ||
                    dayDate === "dimanche"
                    ? returnData(data.dinner)
                    : null
                  : null;
              })}
            </HoursList>
          </div>
        </div>
        <div id="finalCase">
          <p
            onClick={(e) => {
              setShowAllergy(!showAllergy);
              setAlergy(alergy);
            }}
          >
            Allergie(s) ?
          </p>
          {showAllergy && (
            <Allergie
              value={alergy}
              onchange={(e) => setAlergy(e.target.value)}
            />
          )}
          <button type="submit" onClick={submitReservation}>
            Réservez la table
          </button>
        </div>
      </ReservationContainer>
    </Overlay>
  );
}
