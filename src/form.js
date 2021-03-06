const fs = require('fs');
const { Field } = require('./field.js');

const onComplete = (responses) => {
  fs.writeFileSync('./form.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
};

process.stdin.setEncoding('utf8');

const recordResponse = (form, response, logger, onComplete) => {
  try {
    form.fillField(response);
  } catch (error) {
    logger('Wrong input!');
  }

  if (form.isFilled()) {
    onComplete(form.getResponses());
    logger('Thank you!');
    return;
  }
  logger(form.currentPrompt());
};

const fillForm = (form, loger) => {
  loger(form.currentPrompt());

  process.stdin.on('data', (chunk) => {
    recordResponse(form, chunk.trim(), loger, onComplete);
  });
};

class Form {
  #fields;
  #index;
  constructor(...fields) {
    this.#fields = fields;
    this.#index = 0;
  }

  #currentField() {
    return this.#fields[this.#index];
  }

  currentPrompt() {
    return this.#currentField().getPrompt();
  }

  fillField(response) {
    if (!this.#currentField().fill(response)) {
      throw new Error('Invalid Response');
    }

    if (this.#currentField().isFilled()) {
      this.#index++;
    }
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

const isValidLength = (name) => name.length >= 5;

const isDate = (date) => date.match(/^\d{4}-\d{2}-\d{2}$/);

const isNotEmpty = (hobbies) => hobbies.length > 0;

const isTenDigitNum = (phoneNo) => phoneNo.match(/^\d{10}$/);

const splitByComma = (response) => response.split(',');

const createForm = () => {
  const nameField = new Field(
    'name',
    'Please enter your name:',
    isValidLength
  );
  const dobField = new Field(
    'doB',
    'Please enter your dob [yyyy-mm-dd]:',
    isDate
  );
  const hobbiesField = new Field(
    'hobbies',
    'Please enter your hobbies:',
    isNotEmpty,
    splitByComma
  );

  const phoneField = new Field(
    'phoneNo',
    'Please enter your phone number:',
    isTenDigitNum
  );

  const form = new Form(nameField, dobField, hobbiesField, phoneField);
  return form;
};

module.exports = { Form, createForm, fillForm, recordResponse };
