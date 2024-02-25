import { Restaurant } from "./restaurant-dto";

interface CreateRestaurantResponseDto extends Restaurant {}

interface CreateRestaurantDto {
  email: string;
  password: string;
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
}

export { CreateRestaurantResponseDto, CreateRestaurantDto };
