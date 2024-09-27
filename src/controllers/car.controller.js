import  Vehicle  from "../models/car.model.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addCar = asyncHandler(async (req, res) => {
  const { carModel, price, phone, city, maxPictures } = req.body;

  if (!carModel || !price || !phone || !city || !maxPictures) {
    throw new ApiError(400, "All fields are required");
  }

  let pictureUrls = [];

  const files = req.files?.pictures;
  if (files) {
    const uploadPromises = files.map(async (file) => {
      const uploadedImage = await uploadOnCloudinary(file.path);
      return uploadedImage.url;
    });
    pictureUrls = await Promise.all(uploadPromises);
  }

  if (pictureUrls.length > maxPictures) {
    throw new ApiError(400, `You can upload a maximum of ${maxPictures} pictures.`);
  }

  const car = await Vehicle.create({
    model: carModel,
    price,
    phone,
    city,
    images: pictureUrls,
    owner: req.user._id, 
  });

  return res.status(201).json(new ApiResponse(201, car, "Car entry created successfully"));
});

export { addCar };
