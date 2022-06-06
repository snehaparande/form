const fs = require('fs');
const { Person } = require('./person.js');

const writeToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, 'utf8');
};

process.stdin.setEncoding('utf8');

const validateName = (name) => name.length >= 5;

const validateDate = (date) => {
  return date.length === 10 &&
    date.match(/\d{4}-\d{2}-\d{2}/);
};

const validateHobbies = (hobbies) => hobbies.length > 0;

const readData = (person) => {
  const messages = [
    'Please enter your name:',
    'Please enter your date of birth [yyyy-mm-dd]:',
    'Please enter your hobbies:'
  ];
  const readers = [
    (data) => person.setName(data),
    (data) => person.setDoB(data),
    (data) => person.setHobbies(data)
  ];
  const validators = [
    validateName, validateDate, validateHobbies
  ];
  let index = 0;

  console.log(messages[0]);

  process.stdin.on('data', (chunk) => {
    if (!validators[index](chunk.trim())) {
      index--;
    } else {
      readers[index](chunk.trim());
    }

    if (index >= messages.length - 1) {
      writeToFile('./form.json', person.toString());
      process.exit(0);
    }
    index++;
    console.log(messages[index]);
  });
};

const main = () => {
  const person = new Person();
  readData(person);
};

main();
