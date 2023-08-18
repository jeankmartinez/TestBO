import generateRute from "./generateRute.js";

export const handler = async (event) => {
  const data = JSON.parse(event?.body);
  let response = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const key = Object.keys(data);
  let error =
    key != "groups" && `Nombre parametro incorrecto, intente con (groups)`;

  if (!error) {
    const grupos = data.groups.split(",");

    const regex = /^(?:[1-9]\d*|0)(?:,[1-9]\d*|,0)*$/;

    if (!regex.test(data.groups)) {
      error = "Validar parametros, solo se admiten numeros positivos";
    }
  }

  if (error) {
    return { ...response, statusCode: 500, body: JSON.stringify({ error }) };
  } else {
    const size = generateRute(data);
    return { ...response, statusCode: 200, body: JSON.stringify({ size }) };
  }
};
