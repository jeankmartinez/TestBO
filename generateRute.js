const generateRoute = (data) => {
  
  const sizes = [];
  const groups = data.groups.split(",");

  let cant = groups.length;
  const numbers = data.groups.split(',').map(Number);
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  for (let x = 1; x <= sum; x++) {
    let next = true;
    let g = 1;
    let flag = true;
    let index = 0;
    let valid = true;
    let containerValidate = 0;

    while (next && g <= cant) {
      if (flag) {
        containerValidate = x - groups[index];
      } else {
        containerValidate = containerValidate - groups[index];
      }
      flag = containerValidate > 0 ? false : true;

      if (containerValidate < 0 || (containerValidate > 0 && g == cant)) {
        next = false;
        valid = false;
      }
      index++;
      g++;
    }
    if (valid) {
      sizes.push(x);
    }
  }

  return sizes.join(",");
};

module.exports = generateRoute;
