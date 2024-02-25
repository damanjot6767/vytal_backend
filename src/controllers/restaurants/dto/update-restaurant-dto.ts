import { StatusType, UserLoginType, UserType } from "../../../constants";
import { Restaurant } from "./restaurant-dto";

interface UpdateUserResponseDto extends Restaurant {}

interface UpdateRestaurantDto {
  isEmailVerified?: boolean;
  name?: string | null;
  description?: string | null;
  address?: {
    latitude: number | null;
    longitude: number | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: number | null;
  };
}

export { UpdateUserResponseDto, UpdateRestaurantDto };
