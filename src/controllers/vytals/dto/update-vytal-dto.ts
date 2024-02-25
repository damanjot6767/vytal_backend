import { Vytal } from "./vytal-dto";

interface UpdateVytalResponseDto extends Vytal {}

interface UpdateVytalDto {
  name?: string;
  imageUrl?: string;
  qrCodeUrl?: string
}

export { UpdateVytalResponseDto, UpdateVytalDto };
