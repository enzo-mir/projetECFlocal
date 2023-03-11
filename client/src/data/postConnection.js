export default function postConnection(email, mdp) {
  let postAccount = fetch("/auth", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      mdp: mdp,
    }),
  });
  let postRes = postAccount
    .then((res) => res.json())
    .then(async (data) => await data);

  return postRes;
}
