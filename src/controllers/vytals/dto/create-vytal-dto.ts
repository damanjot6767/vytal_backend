import { Vytal } from "./vytal-dto";

interface CreateVytalResponseDto extends Vytal {}

interface CreateVytalDto {
  name: string;
  title: string;
  imageUrl: string;
  qrCodeUrl: string;
  restaurantId: string;
}

export { CreateVytalResponseDto, CreateVytalDto };
