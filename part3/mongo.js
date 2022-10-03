const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Provide the password as an argument atleast. You can also add a new entry to the phonebook by running the following command: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jkgatt:${password}@cluster0.xwezzqu.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const number = process.argv[4];

if (name === undefined || number === undefined) {
  console.log("Retrieving all records from the database");

  mongoose.connect(url).then((result) => {
    Person.find()
      .then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
      })
      .then(() => {
        mongoose.connection.close();
      });
  });
} else {
  console.log("Adding new record to the database");

  mongoose.connect(url).then((result) => {
    console.log("Connected");
    const person = new Person({
      name: name,
      number: number
    })
    return person.save();
  })
  .then(() => {
    console.log(`Added ${name} number: ${number} to phonebook!`);
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  });
}
