const fs = require('fs');

const writeToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, 'utf8');
};

process.stdin.setEncoding('utf8');
const readName = (form) => {
  console.log('Please enter your name:');
  process.stdin.on('data', (chunk) => {
    form.name = chunk.trim();
    writeToFile('./form.json', JSON.stringify(form));
    process.exit(0);
  });
};

const main = () => {
  const form = {
    name: '',
    doB: '',
    hobbies: []
  };
  readName(form);
};

main();
