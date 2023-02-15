export const query = async () => {
  let fetching = fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
  }).then(async (resp) => await resp.json());
  return await fetching;
};
