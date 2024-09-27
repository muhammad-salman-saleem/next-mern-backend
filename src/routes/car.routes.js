import { Router } from 'express';
import {
    addCar,
} from "../controllers/car.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .post(
        upload.fields([
            { name: "pictures", maxCount: 10 },
          ]),
          addCar
    );

export default router