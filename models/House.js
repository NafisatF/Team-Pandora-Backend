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
    required: false,
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
  id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

module.exports = mongoose.model("Houses", houseSchema);
