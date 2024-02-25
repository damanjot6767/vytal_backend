import { cookieOptions } from "../../constants";
import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import {
  ForgetPasswordMailOptions,
  RegisterMailOptions,
  SendMail,
} from "../../utils/mail";
import { RestaurantDto} from "./dto/restaurant-dto";
import {
  generateTempraryToken,
  loginService,
  registerService,
  updateRestaurantService,
  changePasswordService,
  getRestaurantByEmailService,
  getRestaurantService,
} from "./restaurant-service";

const registerRestaurant = asyncHandler(async (req, res) => {
  const response = await registerService(req.body);

  const { token } = await generateTempraryToken(response._id);

  res
    .status(201)
    .cookie("accessToken", response.accessToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        response,
        "We sent a link to your email please click on to verify your mail"
      )
    );
  SendMail(await RegisterMailOptions(response, token));
});

const loginRestaurant = asyncHandler(async (req, res) => {
  const response = await loginService(req.body);

  return res
    .status(200)
    .cookie("accessToken", response.accessToken)
    .json(new ApiResponse(201, response, "Restaurant login successfully"));
});

const getRestaurant = asyncHandler(async (req, res) => {
  const response = await getRestaurantService(req.user._id || req.params?.id);

  return res
    .status(200)
    .json(new ApiResponse(201, response, "Restaurant get successfully"));
});

const updateRestaurant = asyncHandler(async (req, res) => {
  const response = await updateRestaurantService(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(201, response, "Restaurant get successfully"));
});

// const handleSocialLogin = asyncHandler(async (req: any, res) => {
//   const response = await handleSocialLoginService(req.user?._id);

//   return res
//     .status(301)
//     .cookie("accessToken", response?.accessToken, cookieOptions)
//     .json(new ApiResponse(201, response, "User login successfully"));
// });

const confirmMail = asyncHandler(async (req, res) => {
  let response: RestaurantDto;
  response = await getRestaurantService(req.user?._id);

  if (response.isEmailVerified) {
    res.render("mail-already-confirmed", {
      userEmail: response.email,
      userName: response.name,
      link: process.env.FRONTEND_REDIRECT_URL,
    });
    return;
  }

  response = await updateRestaurantService(req.user?._id, { isEmailVerified: true });
  res.render("mail-confirmation-success", {
    userEmail: response.email,
    userName: response.name,
    link: process.env.FRONTEND_REDIRECT_URL,
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const restaurant = await getRestaurantByEmailService(req.body.email);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        restaurant,
        "We sent forget password link please click on that link."
      )
    );

  if (restaurant) {
    const { token } = await generateTempraryToken(restaurant._id);
    SendMail(ForgetPasswordMailOptions(restaurant, token));
  }
});

const changeForgetPassword = asyncHandler(async (req, res) => {
  const response = await changePasswordService(
    req.user?._id,
    req.body?.new_password
  );
  // await SendMail(RegisterMailOptions([response.email], mailConfirmationToken))

  return res
    .status(201)
    .json(new ApiResponse(201, response, "password changed successfully"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = await generateTempraryToken(req.user._id);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "We sent a link to your email please click on to verify your mail"
      )
    );
  SendMail(await RegisterMailOptions(req.user, token));
});

export {
  registerRestaurant,
  loginRestaurant,
  getRestaurant,
  updateRestaurant,
  confirmMail,
  forgetPassword,
  changeForgetPassword,
  verifyEmail,
};
