const assert = require('assert');
const { Field } = require('../src/Field');
const { Form, recordResponse } = require('../src/form');

const identity = (arg) => arg;
const isValidLength = (response) => response.length >= 5;

describe('Form', () => {
  it('should give the current prompt', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('doB', 'Enter dob');
    const form = new Form(nameField, dobField);
    form.fillField('someone');

    assert.strictEqual(form.currentPrompt(), 'Enter dob');
  });

  it('should say is form filled', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('doB', 'Enter dob');
    const form = new Form(nameField, dobField);

    form.fillField('someone');
    assert.strictEqual(form.isFilled(), false);

    form.fillField('2001-12-21');
    assert.strictEqual(form.isFilled(), true);
  });

  it('should throw the error when response is invalid', () => {
    const nameField = new Field('name', 'Enter name', isValidLength);
    const form = new Form(nameField);

    assert.throws(() => form.fillField('some'), new Error('Invalid Response'));
  });

  it('should return all the responses of the form', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('doB', 'Enter dob');
    const form = new Form(nameField, dobField);

    form.fillField('someone');
    form.fillField('2001-12-21');

    assert.deepStrictEqual(form.getResponses(), {
      name: 'someone',
      doB: '2001-12-21'
    });
  });

});

const mockLoger = (expectedLog, actualLog) => {
  let index = 0;
  return (toBePrinted) => {
    assert.deepStrictEqual(toBePrinted, expectedLog[index]);
    actualLog.push(toBePrinted);
    index++;
  };
};

describe('recordResponse', () => {
  it('should record current field', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);

    recordResponse(form, 'someone', identity, identity);

    assert.deepStrictEqual(form.getResponses(), { name: 'someone' });
  });

  it('should print next prompt after recording current field', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('doB', 'Enter dob');
    const form = new Form(nameField, dobField);

    const expectedLog = ['Enter dob'];
    const actualLog = [];
    const loger = mockLoger(expectedLog, actualLog);

    recordResponse(form, 'someone', loger, identity);

    assert.deepStrictEqual(actualLog, expectedLog);
  });

  it('should print error and current prompt when response is invalid', () => {
    const nameField = new Field('name', 'Enter name', isValidLength);
    const form = new Form(nameField);

    const expectedLog = ['Wrong input!', 'Enter name'];
    const actualLog = [];
    const loger = mockLoger(expectedLog, actualLog);

    recordResponse(form, 'so', loger, identity);
    assert.deepStrictEqual(actualLog, expectedLog);
  });

  it('should call onComplete when form is filled', () => {
    const nameField = new Field('name', 'Enter name', isValidLength);
    const form = new Form(nameField);

    const mockOnComplete = (actualFileContent) => {
      return (responses) => {
        actualFileContent.push(responses);
      };
    };
    const expectedFileContent = [{ name: 'someone' }];
    const actualFileContent = [];
    const onComplete = mockOnComplete(actualFileContent);

    recordResponse(form, 'someone', identity, onComplete);
    assert.deepStrictEqual(actualFileContent, expectedFileContent);
  });

});
