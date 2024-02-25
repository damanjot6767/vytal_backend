import { StatusType, UserLoginType, UserType } from "../../../constants";

interface Restaurant {
  _id: string;
  email: string,
  name: string;
  description: boolean;
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
  isEmailVerified: string,
  status: StatusType;
  type: UserType,
  accessToken?: string,
  createdAt: Date;
  updatedAt: Date
}

interface RestaurantDto extends Restaurant {
}

export { Restaurant, RestaurantDto }


