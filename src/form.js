/* eslint-disable max-statements */
const fs = require('fs');
const { Field } = require('./field.js');

const writeToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, 'utf8');
};

process.stdin.setEncoding('utf8');

const validateName = (name) => name.length >= 5;

const validateDate = (date) => {
  return date.match(/^\d{4}-\d{2}-\d{2}$/);
};

const validateHobbies = (hobbies) => hobbies.length > 0;

const validatePhoneNo = (phoneNo) => phoneNo.match(/^\d{10}$/);

const fillForm = (form) => {
  console.log(form.currentPrompt());

  process.stdin.on('data', (chunk) => {
    let response = chunk.trim();
    if (!form.isValid(response)) {
      console.log('Wrong input!');
      console.log(form.currentPrompt());
      return;
    }
    if (form.currentPrompt().includes('hobbies')) {
      response = response.split(',');
    }
    form.fillField(response);

    if (form.isFilled()) {
      writeToFile('./form.json', JSON.stringify(form.getResponses()));
      process.stdin.destroy();
      return;
    }
    console.log(form.currentPrompt());
  });
};

class Form {
  #fields;
  #index;
  constructor(...fields) {
    this.#fields = fields;
    this.#index = 0;
  }

  currentPrompt() {
    const currentField = this.#fields[this.#index];
    return currentField.getPrompt();
  }

  isValid(response) {
    const currentField = this.#fields[this.#index];
    return currentField.isValid(response);
  }

  fillField(response) {
    const currentField = this.#fields[this.#index];
    currentField.fill(response);
    this.#index++;
  }

  isFilled() {
    return this.#fields.every(field => field.isFilled());
  }

  getResponses() {
    return this.#fields.reduce((responses, field) => {
      const { name, response } = field.getEntry();
      responses[name] = response;
      return responses;
    }, {});
  }
}

const createForm = () => {
  const nameField = new Field('name', 'Please enter your name:', validateName);
  const dobField = new Field(
    'doB',
    'Please enter your dob [yyyy-mm-dd]:',
    validateDate
  );
  const hobbiesField = new Field(
    'hobbies',
    'Please enter your hobbies:',
    validateHobbies
  );

  const phoneField = new Field(
    'phoneNo',
    'Please enter your phone number:',
    validatePhoneNo
  );

  const form = new Form(nameField, dobField, hobbiesField, phoneField);
  return form;
};

module.exports = { Form, createForm, fillForm };
