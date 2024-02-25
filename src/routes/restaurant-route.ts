import { Router } from "express";
import { upload } from "../middlewares/multer-middleware";
import {
  changeForgetPassword,
  confirmMail,
  getRestaurant,
  loginRestaurant,
  registerRestaurant,
  updateRestaurant,
  forgetPassword,
  verifyEmail,
} from "../controllers/restaurants/restaurant-controller";
import {
  CreateRestaurantJoiValidation,
  LoginRestaurantJoiValidation,
  UpdateRestaurantJoiValidation,
} from "../controllers/restaurants/validation";
import { verifyRestaurantJWT, verifyRestaurantMailJWT } from "../middlewares/auth-middleware";
import passport from "passport";
import { UpdateOrderJoiValidation } from "../controllers/orders/validation/update-order-validation";
import { getAllOrdersByRestaurant, getOrder, updateOrder } from "../controllers/orders/order-controller";
import { GetOrderByIdParamJoiValidation } from "../controllers/orders/validation/order-param-validation";

const router = Router();

router.route("/register").post(CreateRestaurantJoiValidation, registerRestaurant);

router.route("/login").post(LoginRestaurantJoiValidation, loginRestaurant);

router.route("/confirm-mail").get(verifyRestaurantMailJWT, confirmMail);

router.route("/forget-password").post(forgetPassword);

router.route("/change-password").post(verifyRestaurantMailJWT, changeForgetPassword);

router.route("/verify-email").get(verifyRestaurantJWT, verifyEmail);

router.route('/update-order/:id').post(verifyRestaurantJWT, GetOrderByIdParamJoiValidation, UpdateOrderJoiValidation, updateOrder);

router.route('/get-all-orders').get(verifyRestaurantJWT, getAllOrdersByRestaurant)

router.route('/get-order-by-id/:id').get( verifyRestaurantJWT, getOrder)

router.route("/:id").get(verifyRestaurantJWT, getRestaurant);

router
  .route("/update/:id")
  .post(verifyRestaurantJWT, UpdateRestaurantJoiValidation, updateRestaurant);

// router.route("/auth/google").get(
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   }),
//   (req, res) => {
//     res.send("redirecting to google...");
//   }
// );

// router
//   .route("/auth/google/callback")
//   .get(passport.authenticate("google", { session: false }), handleSocialLogin);

export default router;
