const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log(`Connecting to MongoDB at: ${url}`);

mongoose
  .connect(url)
  .then((result) => console.log("Connected Successfully"))
  .catch((error) =>
    console.log(`Error connecting to MongoDB due to: ${error.message}`)
  );

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    require: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
