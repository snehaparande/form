const fs = require('fs');
const { Person } = require('./person.js');

const writeToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, 'utf8');
};

process.stdin.setEncoding('utf8');

const readData = (person) => {
  const messages = [
    'Please enter your name:',
    'Please enter your dob:',
    'Please enter your hobbies:'
  ];
  const readers = [
    (data) => person.setName(data),
    (data) => person.setDoB(data),
    (data) => person.setHobbies(data)
  ];
  let index = 0;

  console.log(messages[0]);

  process.stdin.on('data', (chunk) => {
    readers[index](chunk);

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
