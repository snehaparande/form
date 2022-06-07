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

const validatePhoneNo = (phoneNo) => phoneNo.match(/^\d{10}$/);

const readData = (formFields, person) => {
  let index = 0;
  console.log(formFields[index].message);

  process.stdin.on('data', (chunk) => {
    if (!formFields[index].validator(chunk.trim())) {
      console.log('Wrong input!');
      index--;
    } else {
      formFields[index].parser(chunk.trim());
    }

    if (index >= formFields.length - 1) {
      writeToFile('./form.json', person.toString());
      process.exit(0);
    }
    index++;
    console.log(formFields[index].message);
  });
};

const main = () => {
  const person = new Person();

  const formFields = [
    {
      message: 'Please enter your name:',
      parser: (data) => person.setName(data),
      validator: validateName
    },
    {
      message: 'Please enter your date of birth [yyyy-mm-dd]:',
      parser: (data) => person.setDoB(data),
      validator: validateDate
    },
    {
      message: 'Please enter your hobbies:',
      parser: (data) => person.setHobbies(data),
      validator: validateHobbies
    },
    {
      message: 'Please enter your phone number:',
      parser: (data) => person.setPhoneNo(data),
      validator: validatePhoneNo
    }
  ];

  readData(formFields, person);
};

main();
