import { Router } from "express";
import { upload } from "../middlewares/multer-middleware";
import {
  changeForgetPassword,
  confirmMail,
  getUser,
  handleSocialLogin,
  loginUser,
  registerUser,
  updateUser,
  forgetPassword,
  verifyEmail,
} from "../controllers/users/user-controller";
import {
  CreateUserJoiValidation,
  LoginUserJoiValidation,
  UpdateUserJoiValidation,
} from "../controllers/users/validation";
import { verifyUserJWT, verifyUserMailJWT } from "../middlewares/auth-middleware";
import passport from "passport";
import { CreateOrderJoiValidation } from "../controllers/orders/validation/create-order-validation";
import { createOrder, getAllOrdersByUser, getOrder } from "../controllers/orders/order-controller";

const router = Router();

router.route("/register").post(CreateUserJoiValidation, registerUser);

router.route("/login").post(LoginUserJoiValidation, loginUser);

router.route("/confirm-mail").get(verifyUserMailJWT, confirmMail);

router.route("/forget-password").post(forgetPassword);

router.route("/change-password").post(verifyUserMailJWT, changeForgetPassword);

router.route("/verify-email").get(verifyUserJWT, verifyEmail);

router.route('/create-order').post(verifyUserJWT, CreateOrderJoiValidation, createOrder);

router.route('/get-all-orders').get(verifyUserJWT, getAllOrdersByUser)

router.route('/get-order-by-id/:id').get( verifyUserJWT, getOrder)

router.route("/:id").get(verifyUserJWT, getUser);

router.route("/update/:id").post(verifyUserJWT, UpdateUserJoiValidation, updateUser);

router.route("/auth/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("redirecting to google...");
  }
);

router
  .route("/auth/google/callback")
  .get(passport.authenticate("google", { session: false }), handleSocialLogin);

export default router;
