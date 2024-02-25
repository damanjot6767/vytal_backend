import { Restaurant } from "../../restaurants/dto/restaurant-dto";

interface Vytal {
  _id: string;
  title: string;
  imageUrl: string;
  qrCodeurl: string;
  restaurant: Restaurant
  createdAt: Date;
  updatedAt: Date
}

interface VytalResponseDto extends Vytal {
}

export { Vytal, VytalResponseDto }


