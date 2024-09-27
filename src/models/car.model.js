import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    length: 11,
  },
  city: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
