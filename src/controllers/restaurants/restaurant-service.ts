import { ApiError } from "../../utils/api-error";
import { RestaurantModel } from "../../models/index";
import {
  changePassword,
  createRestaurant,
  findRestaurantByEmail,
  findRestaurantById,
  findRestaurantByLoginCredential,
  updateRestaurantById,
} from "../../models/restaurant.model";
import { CreateRestaurantDto, CreateRestaurantResponseDto, RestaurantDto, UpdateRestaurantDto } from "./dto";

export const registerService = async (
  restaurantCreateDto: CreateRestaurantDto
): Promise<CreateRestaurantResponseDto> => {
  const restaurant = await findRestaurantByEmail(restaurantCreateDto.email);
  if (restaurant) throw new ApiError(400, "Restarurant already exist");

  const restaurantResponse = await createRestaurant(restaurantCreateDto);
  const { accessToken } = await generateAccessAndRefereshTokens(
    restaurantResponse._id
  );

  const restaurantDetails = await findRestaurantById(restaurantResponse._id);
  restaurantDetails.accessToken = accessToken;
  return restaurantDetails;
};

export const loginService = async ({
  password,
  email,
}: {email:string, password:string}): Promise<RestaurantDto> => {
  const restaurant = await findRestaurantByLoginCredential(email, password);
  if (!restaurant) throw new ApiError(400, "Invalid Credentials");

  const { accessToken } = await generateAccessAndRefereshTokens(restaurant._id);
  restaurant.accessToken = accessToken;

  return restaurant;
};

export const getRestaurantService = async (
  id: string
): Promise<RestaurantDto> => {
  const restaurant = await findRestaurantById(id);
  return restaurant;
};

export const updateRestaurantService = async (
  id: string,
  updateRestaurantDto: UpdateRestaurantDto
): Promise<RestaurantDto> => {
  const restaurant = await updateRestaurantById(id, updateRestaurantDto);
  return restaurant;
};

// export const handleSocialLoginService = async (
//   userId: string
// ): Promise<CreateUserResponseDto> => {
//   const user = await findUserById(userId);

//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const { accessToken } = await generateAccessAndRefereshTokens(user._id);
//   user["accessToken"] = accessToken;

//   return user;
// };

const generateAccessAndRefereshTokens = async (userId: string) => {
  try {
    const restaurant = await RestaurantModel.findById(userId);
    const accessToken = restaurant.generateAccessToken(restaurant);
    const refreshToken = restaurant.generateRefreshToken(restaurant);

    restaurant.refreshToken = refreshToken;
    await restaurant.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

export const generateTempraryToken = async (restaurantId: string) => {
  try {
    const restaurant = await RestaurantModel.findById(restaurantId);
    const token = restaurant.generateTempraryToken(restaurant);

    return { token };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating mail token");
  }
};

export const changePasswordService = async (
  id: string,
  password: string
): Promise<RestaurantDto> => {
  const restaurant = await changePassword(id, password);
  return restaurant;
};

export const getRestaurantByEmailService = async (
  email: string
): Promise<RestaurantDto> => {
  const restaurant = await findRestaurantByEmail(email);
  return restaurant;
};
