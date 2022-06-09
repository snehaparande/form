const assert = require('assert');
const { Field } = require('../src/field');

const isVallidLength = (response) => response.length >= 5;

describe('Field', () => {
  it('Should return the prompt of the field', () => {
    const field = new Field('name', 'Enter name');
    assert.strictEqual(field.getPrompt(), 'Enter name');
  });

  it('Should fill the given response', () => {
    const field = new Field('name', 'Enter name');
    field.fill('abcd');
    assert.strictEqual(field.isFilled(), true);
  });

  it('Should return false when response is invalid', () => {
    const field = new Field('name', 'Enter name', isVallidLength);
    assert.strictEqual(field.fill('abc'), false);
  });

  it('Should return name and response of the field', () => {
    const splitByComma = (response) => response.split(',');
    const field = new Field(
      'hobbies',
      'Enter hobbies',
      () => true,
      splitByComma
    );
    field.fill('abc,def');
    const expected = { name: 'hobbies', response: ['abc', 'def'] };
    assert.deepStrictEqual(field.getEntry(), expected);
  });

});
