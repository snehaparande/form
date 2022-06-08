class Field {
  #name;
  #prompt;
  #validator;
  #response;

  constructor(name, prompt, validator) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
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
    return { name: this.#name, response: this.#response };
  }
}

module.exports = { Field };
