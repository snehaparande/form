const fs = require('fs');
const { Person } = require('./person.js');

const writeToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, 'utf8');
};

process.stdin.setEncoding('utf8');

const readName = (person) => {
  console.log('Please enter your name:');
  process.stdin.on('data', (chunk) => {
    person.setName(chunk.trim());
    process.stdin.removeAllListeners('data');

    console.log('Please enter your dob:');
    process.stdin.on('data', (chunk) => {
      person.setDoB(chunk.trim());
      process.stdin.removeAllListeners('data');

      console.log('Please enter your hobbies:');
      process.stdin.on('data', (chunk) => {
        person.setHobbies(chunk.trim().split(','));
        writeToFile('./form.json', person.toString());
        console.log('Thank you');
        process.exit(0);
      });
    });
  });
};

const main = () => {
  const person = new Person();
  readName(person);
};

main();
