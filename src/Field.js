class Field {
  #name;
  #prompt;
  #validator;
  #response;
  #parser;

  constructor(name, prompt, validator = () => true, parser = arg => arg) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  getPrompt() {
    return this.#prompt;
  }

  isValid(response) {
    return this.#validator(response);
  }

  fill(response) {
    this.#response = response;
  }

  isFilled() {
    return this.#response !== null;
  }

  getEntry() {
    return { name: this.#name, response: this.#parser(this.#response) };
  }
}

module.exports = { Field };
