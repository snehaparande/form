class Person {
  constructor() {
    this.name = '';
    this.doB = '';
    this.hobbies = [];
    this.phoneNo = '';
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

  setPhoneNo(phoneNo) {
    this.phoneNo = phoneNo;
  }

  toString() {
    return JSON.stringify(this);
  }
}

exports.Person = Person;
