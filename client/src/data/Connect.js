import dataJWT from "./dataJWT";

export default function Connect({ isConnected, isAdmin }) {
  /* Si  la session localStorage userLogin existe*/
  if (window.localStorage.getItem("adminLogin")) {
    return window.localStorage.getItem("adminLogin")
      ? isAdmin(true)
      : isAdmin(false);
  }
  if (window.localStorage.getItem("userToken")) {
    typeof window.localStorage.getItem("userToken") === "string"
      ? isConnected(true)
      : isConnected(false);
  }
}
export let userData =
  // eslint-disable-next-line no-unused-expressions
  typeof window.localStorage.getItem("userToken") === "string"
    ? dataJWT().then(async (data) => await data)
    : null;
