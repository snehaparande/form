const { createForm, fillForm } = require('./src/form.js');

const main = () => {
  const form = createForm();
  fillForm(form, console.log);
};

main();