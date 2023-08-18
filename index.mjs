// Importa la función 'generateRute' desde el archivo 'generateRute.js'
import generateRute from "./generateRute.js";

// Define una función asincrónica llamada 'handler' que toma un evento como parámetro
export const handler = async (event) => {
  // Intenta analizar el cuerpo del evento como JSON y lo asigna a la variable 'data'
  const data = JSON.parse(event?.body);

  // Define un objeto de respuesta inicial con encabezados para JSON
  let response = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Obtiene las claves del objeto 'data' y las asigna a la variable 'key'
  const key = Object.keys(data);

  // Inicializa una variable 'error'
  let error;

  // Verifica si 'key' no es igual a "groups", en cuyo caso establece un mensaje de error
  if (key != "groups") {
      error = "Nombre parámetro incorrecto, intente con (groups)";
  }

  // Si no hay error hasta ahora, se realizan más verificaciones
  if (!error) {
    // Divide el valor de 'groups' en una matriz de grupos individuales
    //const grupos = data.groups.split(",");

    // Define una expresión regular para validar el formato de los grupos (números positivos separados por comas)
    const regex = /^(?:[1-9]\d*|0)(?:,[1-9]\d*|,0)*$/;

    // Si el formato no cumple con la expresión regular, se establece un mensaje de error
    if (!regex.test(data.groups)) {
      error = "Validar parametros, solo se admiten numeros positivos";
    }
  }

  // Si hay un error, se devuelve una respuesta de error; de lo contrario, se genera el tamaño de ruta y se devuelve una respuesta exitosa
  if (error) {
    return { ...response, statusCode: 500, body: JSON.stringify({ error }) };
  } else {
    const size = generateRute(data);
    return { ...response, statusCode: 200, body: JSON.stringify({ size }) };
  }
};