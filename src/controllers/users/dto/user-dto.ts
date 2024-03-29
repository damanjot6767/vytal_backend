import { Document } from "mongoose";
import { StatusType, UserLoginType, UserType } from "../../../constants";

interface User {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  fullName: string | null;
  address: {
    latitude: number | null,
    longitude: number | null,
    addressLine1: string | null,
    addressLine2: string | null,
    city: string | null,
    state: string | null,
    country: string | null,
    postalCode: number | null,
  };
  profileImage: string | null; // cloudinary url
  accessToken: string | null;
  loginType: UserLoginType;
  status: StatusType;
  type: UserType,
  createdAt: Date;
  updatedAt: Date
}

interface UserResponseDto extends User {
}

export { User, UserResponseDto }


