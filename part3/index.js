require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :body"
  )
);

app.get("/info", (request, response, next) => {
  Person.count()
    .then((total) => {
      let body = `<p>PhoneBook has info for ${total} people.</p>`;
      body += `<p>${new Date()}</p>`;
      return response.send(body);
    })
    .catch(next);
});

app.get("/api/persons", (request, response, next) => {
  Person.find()
    .then((persons) => response.json(persons))
    .catch(next);
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(next);
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((request) => {
      response.status(204).end();
    })
    .catch(next);
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name == undefined || body.number == undefined) {
    return response.status(400).json({
      error: "Name or number are missing",
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  Person.findOne({ name: newPerson.name }).then((person) => {
    if (person) {
      console.log(
        `${person.name} already in the database, updating the number`
      );
      // Person.findOneAndUpdate(
      //   { name: body.name },
      //   { number: body.number },
      //   { new: true }
      // )
      //   .then((updatedPerson) => console.log(updatedPerson))
      //   .catch(next);

      return response.status(409).send({error: 'User already exists in the phonebook.'})
    } else {
      newPerson
        .save()
        .then((savedPerson) => response.status(201).json(savedPerson))
        .catch(next);
    }
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const updatedPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true, runValidators: true, context: 'query'  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "Malformed ID" });
  } else if(err.name === "ValidationError"){
    return res.status(400).json({error: err.message});
  }

  return res.status(500).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
