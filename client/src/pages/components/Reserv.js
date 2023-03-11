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
import { Cross } from "../../assets/style/cross";
import dataJWT from "../../data/dataJWT";

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
  const [DTable, setDTable] = useState([]);
  const [LTable, setLTable] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    query().then((data) => setFet(data.heures));
    isConnected();

    // eslint-disable-next-line no-unused-expressions
    typeof window.localStorage.getItem("userToken") === "string"
      ? dataJWT().then(async (data) => {
          setUserData(await data);
        })
      : null;
    console.log(userData);
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  let lunchTable = [];
  let dinnerTable = [];

  document.body.style.overflow = "hidden";

  function handleChangeDate(e) {
    let dateDay = new Date(e.target.value).toLocaleDateString("fr-FR", {
      weekday: "long",
    });

    let fullDate = new Date(e.target.value).toLocaleDateString("fr-CA");

    setDate(fullDate);
    setDayDate(dateDay);

    let hourFetchLunch;
    let hourFetchDinner;

    fet.forEach((elem) => {
      if (Object.values(elem)[1] === dateDay) {
        hourFetchLunch = elem.lunch;
        hourFetchDinner = elem.dinner;
        console.log(elem);
        if (elem.lunch.indexOf("-") === -1) {
          setLTable("Fermer");
        }
        if (elem.dinner.indexOf("-") === -1) {
          setDTable("Fermer");
        }
      }
    });
    spliting(hourFetchLunch, lunchTable);
    spliting(hourFetchDinner, dinnerTable);
    function spliting(fetch, table) {
      if (fetch.indexOf("-") !== -1) {
        let splitingLunch = fetch.split(" - ");
        let splitHourLunch = splitingLunch[0].split("h");
        let splitMinuteLunch = splitingLunch[1].split("h");
        let startHourLunch = parseInt(splitHourLunch[0]);
        let endHourLunch = parseInt(splitMinuteLunch[0]);
        let startDecimalLunch = parseInt(splitHourLunch[1]) / 60;
        let endDecimalLunch = parseInt(splitMinuteLunch[1]) / 60;
        let fullStartLunch = isNaN(startDecimalLunch)
          ? startHourLunch
          : startHourLunch + startDecimalLunch;
        let fullEndLunch = isNaN(endDecimalLunch)
          ? endHourLunch
          : endHourLunch + endDecimalLunch;

        for (let i = fullStartLunch; i <= fullEndLunch - 0.5; i += 0.25) {
          table.push(i + "");
        }
        table.forEach((elem) => {
          var sliceMinutes;
          if (elem.indexOf(".") !== -1) {
            sliceMinutes =
              elem.slice(3) / 100 === 0.05
                ? elem.slice(0, elem.indexOf(".")) +
                  "h" +
                  (elem.slice(3) * 6).toString()
                : elem.slice(0, elem.indexOf(".")) +
                  "h" +
                  (elem.slice(3) * 0.6).toString();
          } else sliceMinutes = elem + "h";

          table.push(sliceMinutes);
        });
        if (table == dinnerTable) {
          setDTable(table.slice(table.length / 2));
        } else if (table == lunchTable) {
          setLTable(table.slice(table.length / 2));
        }
      }
    }
  }

  function unselectHours() {
    document.onmouseup = (e) => {
      let obj = document.querySelector(".selected");
      if (obj !== null) {
        if (
          obj !== e.target &&
          document.getElementById("submitRes") !== e.target
        ) {
          obj.classList.remove("selected");
        }
      }
    };
  }
  let time;

  function selectHours(e) {
    unselectHours();
    let parentToGetJourney =
      e.target.parentNode.parentNode.parentNode.getAttribute("id");
    let oldTarget = document.querySelector(".selected");
    if (oldTarget) oldTarget.removeAttribute("class");
    let target = e.target;
    target.classList.add("selected");
    time = parentToGetJourney.slice(0, parentToGetJourney.indexOf("Hours"));
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
                  time
                )
                  .then((res) => res.json())
                  .then(async (data) => {
                    await data;
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
                postReservation(
                  guests,
                  date,
                  email,
                  name,
                  hourTargeted,
                  "",
                  time
                );
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
              {typeof LTable === "object" ? (
                LTable.map((lunch, id) => {
                  return (
                    <button key={id} onClick={selectHours} tabIndex={id}>
                      {lunch}
                    </button>
                  );
                })
              ) : (
                <p>{LTable}</p>
              )}
            </HoursList>
          </div>
        </div>
        <div id="dinerHours">
          <h2>SOIR</h2>
          <div className="hours">
            <HoursList>
              {typeof DTable === "object" ? (
                DTable.map((dinner, id) => {
                  return (
                    <button key={id} onClick={selectHours} tabIndex={id}>
                      {dinner}
                    </button>
                  );
                })
              ) : (
                <p>{DTable}</p>
              )}
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
          <button
            id="submitRes"
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              submitReservation(e);
            }}
          >
            Réservez la table
          </button>
        </div>
      </ReservationContainer>
    </Overlay>
  );
}
