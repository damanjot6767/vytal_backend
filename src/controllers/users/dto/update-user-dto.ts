import { StatusType, UserLoginType, UserType } from "../../../constants";
import { User } from "./user-dto";

interface UpdateUserResponseDto extends User {}

interface UpdateUserDto {
  fullName?: string | null;
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
  profileImage?: string | null;
  isEmailVerified?: boolean
}

export { UpdateUserResponseDto, UpdateUserDto };
