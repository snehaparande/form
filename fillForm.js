const { createForm, fillForm } = require("./src/form");

const main = () => {
  const form = createForm();
  fillForm(form);
};

main();