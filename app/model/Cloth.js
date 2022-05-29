const mongoose = require("mongoose");

const ClothSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    image:{
        type: String,
        required: true
    },
  },
);

const clothes = mongoose.model("clothes", ClothSchema);
module.exports = clothes;
