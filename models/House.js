const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  uploadedDate: {
    type: Date,
    required: true,
  },
  landordName: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("House", houseSchema);
