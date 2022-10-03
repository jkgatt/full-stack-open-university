require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require('./models/person');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

app.get("/info", (request, response) => {
  let body = `<p>Phone has info for ${persons.length} people.</p>`;
  body += `<p>${new Date()}</p>`;
  return response.send(body);
});

app.get("/api/persons", (request, response) => {
  Person.find().then(persons => response.json(persons));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => response.json(person));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).send();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name == undefined || body.number == undefined) {
    return response.status(400).json({
      error: "Name or number are missing",
    });
  }

  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "Person already exists and name must be unique",
  //   });
  // }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then(savedPerson => console.log(savedPerson))
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
