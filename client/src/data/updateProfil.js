export default async function updateProfil(
  nom,
  email,
  mdp,
  convives,
  alergies,
  oldEmail,
  oldPassword
) {
  let postUpdateAccount = fetch("/updateProfil", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      nom: nom,
      email: email,
      mdp: mdp,
      convives: convives,
      alergies: alergies,
      oldEmail: oldEmail,
      oldPassword: oldPassword,
    }),
  });
  let postRes = postUpdateAccount
    .then((res) => res.json())
    .then(async (data) => await data);

  return postRes;
}
