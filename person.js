class Person {
  constructor() {
    this.name = '';
    this.doB = '';
    this.hobbies = [];
  }

  setName(name) {
    this.name = name;
  }

  setDoB(doB) {
    this.doB = doB;
  }

  setHobbies(hobbies) {
    this.hobbies = hobbies.split(',');
  }

  toString() {
    return JSON.stringify(this);
  }
}

exports.Person = Person;
