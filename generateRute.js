// Funci�n que genera una ruta basada en datos de entrada
const generateRoute = (data) => {
  // Array para almacenar los tama�os de ruta v�lidos
  const sizes = [];
  
  // Divide el grupo de datos en un array de grupos individuales
  const groups = data.groups.split(",");
  
  // Cantidad de grupos en total
  let cant = groups.length;
  
  // Convierte los grupos a n�meros y calcula la suma total
  const numbers = data.groups.split(',').map(Number);
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // Ciclo para iterar a trav�s de posibles tama�os de ruta
  for (let x = 1; x <= sum; x++) {
    
    //Declaraci�n de variables para validaciones
    let next = true;
    let g = 1;
    let flag = true;
    let index = 0;
    let valid = true;
    let containerValidate = 0;

    // Bucle interno para validar los grupos en la ruta
    while (next && g <= cant) {
      
      // Calcula la capacidad restante del contenedor en funci�n de grupos anteriores
      if (flag) {
        containerValidate = x - groups[index];
      } else {
        containerValidate = containerValidate - groups[index];
      }
      
      // Establece la bandera seg�n la capacidad del contenedor
      if (containerValidate > 0) {
          flag = false;
      } else {
          flag = true;
      }

      // Verifica si la capacidad del contenedor es inv�lida o si se lleg� al final de los grupos
      if (containerValidate < 0 || (containerValidate > 0 && g == cant)) {
        next = false;
        valid = false;
      }
      index++;
      g++;
    }
    // Si la ruta es v�lida, agrega su tama�o al array de tama�os v�lidos
    if (valid) {
      sizes.push(x);
    }
  }

  // Retorna los tama�os de ruta v�lidos como una cadena separada por comas
  return sizes.join(",");
};

// Exporta la funci�n para su uso externo
module.exports = generateRoute;