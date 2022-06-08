const assert = require('assert');
const { Field } = require('../src/Field');
const { Form } = require('../src/form');

describe('Form', () => {
  it('should give the current prompt', () => {
    const nameField = new Field('name', 'Enter name', () => true);
    const dobField = new Field('doB', 'Enter dob', () => true);
    const form = new Form(nameField, dobField);
    form.fillField('someone');

    assert.strictEqual(form.currentPrompt(), 'Enter dob');
  });

  it('should say is form filled', () => {
    const nameField = new Field('name', 'Enter name', () => true);
    const dobField = new Field('doB', 'Enter dob', () => true);
    const form = new Form(nameField, dobField);

    form.fillField('someone');
    assert.strictEqual(form.isFilled(), false);

    form.fillField('2001-12-21');
    assert.strictEqual(form.isFilled(), true);
  });

  it('should return all the responses of the form', () => {
    const nameField = new Field('name', 'Enter name', () => true);
    const dobField = new Field('doB', 'Enter dob', () => true);
    const form = new Form(nameField, dobField);

    form.fillField('someone');
    form.fillField('2001-12-21');

    assert.deepStrictEqual(form.getResponses(), {
      name: 'someone',
      doB: '2001-12-21'
    });
  });

});
