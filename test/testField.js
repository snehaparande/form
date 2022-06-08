const assert = require('assert');
const { Field } = require('../src/Field');

describe('Field', () => {
  it('Should return the prompt of the field', () => {
    const field = new Field('name', 'Enter name', () => true);
    assert.strictEqual(field.getPrompt(), 'Enter name');
  });

  it('Should validate the given response', () => {
    const lengthGreaterthan5 = (response) => response.length >= 5;
    const field = new Field('name', 'Enter name', lengthGreaterthan5);

    assert.strictEqual(field.isValid('a'), false);
    assert.strictEqual(field.isValid('abcde'), true);
  });

  it('Should fill the given response', () => {
    const field = new Field('name', 'Enter name', () => true);
    field.fill('abcd');
    assert.strictEqual(field.isFilled(), true);
  });

  it('Should return name and response of the field', () => {
    const field = new Field('name', 'Enter name', () => true);
    field.fill('abcd');
    assert.deepStrictEqual(field.getEntry(), { name: 'name', response: 'abcd' });
  });

});
