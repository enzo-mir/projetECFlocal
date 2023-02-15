export const carteQuery = async () => {
  let fetching = fetch("/carteapi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
  }).then(async (resp) => await resp.json());
  return await fetching;
};
