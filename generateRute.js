// Función que genera una ruta basada en datos de entrada
const generateRoute = (data) => {
  // Array para almacenar los tamaños de ruta válidos
  const sizes = [];
  
  // Divide el grupo de datos en un array de grupos individuales
  const groups = data.groups.split(",");
  
  // Cantidad de grupos en total
  let cant = groups.length;
  
  // Convierte los grupos a números y calcula la suma total
  const numbers = data.groups.split(',').map(Number);
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // Ciclo para iterar a través de posibles tamaños de ruta
  for (let x = 1; x <= sum; x++) {
    
    //Declaración de variables para validaciones
    let next = true;
    let g = 1;
    let flag = true;
    let index = 0;
    let valid = true;
    let containerValidate = 0;

    // Bucle interno para validar los grupos en la ruta
    while (next && g <= cant) {
      
      // Calcula la capacidad restante del contenedor en función de grupos anteriores
      if (flag) {
        containerValidate = x - groups[index];
      } else {
        containerValidate = containerValidate - groups[index];
      }
      
      // Establece la bandera según la capacidad del contenedor
      if (containerValidate > 0) {
          flag = false;
      } else {
          flag = true;
      }

      // Verifica si la capacidad del contenedor es inválida o si se llegó al final de los grupos
      if (containerValidate < 0 || (containerValidate > 0 && g == cant)) {
        next = false;
        valid = false;
      }
      index++;
      g++;
    }
    // Si la ruta es válida, agrega su tamaño al array de tamaños válidos
    if (valid) {
      sizes.push(x);
    }
  }

  // Retorna los tamaños de ruta válidos como una cadena separada por comas
  return sizes.join(",");
};

// Exporta la función para su uso externo
module.exports = generateRoute;