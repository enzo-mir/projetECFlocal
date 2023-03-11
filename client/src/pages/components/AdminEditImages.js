import React, { useEffect, useRef, useState } from "react";
import { Overlay } from "../../assets/style/overlay";
import styled from "styled-components";
import editBtn from "../../assets/images/edit_btn.png";
import { Cross } from "../../assets/style/cross";

const AdminEditImages = ({ title, description, url, displaying, adding }) => {
  const [titleChange, setTitleChange] = useState(title);
  const [descChange, setDescChange] = useState(description);
  const [imgSrc, setImgSrc] = useState(url);
  const [errorFormat, setErrorFormat] = useState(false);

  useEffect(() => {
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  document.body.style.overflow = "hidden";

  const [imgTargetFile, setImgTargetFile] = useState();
  let fd = useRef(null);

  function handleChange(event) {
    let file = event.target.files[0];
    setImgTargetFile(file);
    let urlChanging = URL.createObjectURL(file);
    fd.current = new FormData();
    fd.current.append("file", file);
    fd.current.append("upload_preset", "wd7vsf01");
    setImgSrc(urlChanging);
  }

  async function handleSubmit() {
    if (
      imgTargetFile.type === "image/png" ||
      imgTargetFile.type === "image/jpeg" ||
      imgTargetFile.type === "image/jpg"
    ) {
      if (imgTargetFile) {
        fetch(`https://api.cloudinary.com/v1_1/dbo6hyl8t/image/upload`, {
          method: "POST",
          body: fd.current,
        })
          .then((response) => response.json())
          .then(async (data) => {
            await data;
            let postDataImage = fetch("/adminImageEdited", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Connection: "keep-alive",
                Accept: "*",
              },
              body: JSON.stringify({
                titre: titleChange,
                desc: descChange,
                oldUrl: url,
                newUrl: data.secure_url,
                pubId: data.public_id,
                add: false,
              }),
            });
            await postDataImage.then(window.location.reload());
          });
      } else {
        let postDataImage = fetch("/adminImageEdited", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Connection: "keep-alive",
            Accept: "*",
          },
          body: JSON.stringify({
            titre: titleChange,
            desc: descChange,
            oldUrl: url,
            newUrl: url,
            pubId: null,
            add: false,
          }),
        });
        await postDataImage.then(window.location.reload());
      }
      setErrorFormat(false);
    } else {
      setErrorFormat("Erreur de format, format convenus : JPG, PNG, JPEG ");
    }
  }

  function handleAdd() {
    if (
      imgTargetFile.type === "image/png" ||
      imgTargetFile.type === "image/jpeg" ||
      imgTargetFile.type === "image/jpg"
    ) {
      if (imgTargetFile) {
        if (titleChange) {
          if (descChange) {
            fetch(`https://api.cloudinary.com/v1_1/dbo6hyl8t/image/upload`, {
              method: "POST",
              body: fd.current,
            })
              .then((response) => response.json())
              .then(async (data) => {
                await data;
                let postDataImage = fetch("/adminImageEdited", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Connection: "keep-alive",
                    Accept: "*",
                  },
                  body: JSON.stringify({
                    titre: titleChange,
                    desc: descChange,
                    oldUrl: data.secure_url,
                    newUrl: data.secure_url,
                    pubId: data.public_id,
                    add: true,
                  }),
                });
                await postDataImage.then(window.location.reload());
              });
          }
        }
      }
    } else {
      setErrorFormat("Erreur de format, format convenus : JPG, PNG, JPEG ");
    }
  }

  return (
    <Overlay onClick={() => displaying(false)}>
      <ContainerWrapper onClick={(e) => e.stopPropagation()}>
        <Cross onClick={() => displaying(false)} />
        {errorFormat && <p>{errorFormat}</p>}
        <input
          type="file"
          id="imageAdminChange"
          onChange={(e) => {
            handleChange(e);
          }}
          accept="image/png, image/jpeg, image/jpg"
        />
        <label htmlFor="imageAdminChange">
          {adding ? (
            <div
              className="addImageCase"
              style={{
                background: imgSrc ? "url(" + imgSrc + ")" : "black",
              }}
            ></div>
          ) : (
            <img src={imgSrc} alt="plat du chef" />
          )}
        </label>
        <p>Titre</p>
        <input
          type="text"
          onChange={(e) => {
            setTitleChange(e.target.value);
          }}
          value={titleChange}
        />
        <p>Description</p>
        <input
          type="text"
          onChange={(e) => {
            setDescChange(e.target.value);
          }}
          value={descChange}
        />
        {adding ? (
          <button id="submitEditImage" onClick={() => handleAdd()}>
            Ajouter
          </button>
        ) : (
          <button id="submitEditImage" onClick={() => handleSubmit()}>
            Envoyer
          </button>
        )}
      </ContainerWrapper>
    </Overlay>
  );
};
const ContainerWrapper = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  padding-block: 50px;
  width: 1000px;
  min-height: 60vh;
  max-width: 100%;
  z-index: 150;
  background-color: #fff;
  font-size: var(--font-size);
  & label {
    position: relative;
    z-index: -1;

    .addImageCase {
      width: clamp(150px, 13vw, 200px);
      aspect-ratio: 1/1;
      border-radius: 10px;
      transition: 0.15s ease-out;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url(${editBtn});
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
      opacity: 0;
      transition: 0.15s ease-out;
      z-index: 1;
    }
    &:hover {
      cursor: pointer;
      & img {
        filter: brightness(50%);
      }

      &::after {
        opacity: 1;
      }
    }
  }

  & img {
    width: clamp(150px, 13vw, 200px);
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 10px;
    transition: 0.15s ease-out;
  }
  & input {
    font-size: var(--font-size);
    width: 75%;
    &[type="file"] {
      display: none;
    }
  }
`;

export default AdminEditImages;
