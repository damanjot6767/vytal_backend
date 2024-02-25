import { Order } from "./order-dto";

interface UpdateOrderResponseDto extends Order {}

interface UpdateOrderDto {
  status: string;
  userId: string;
  vytalId: string;
  orderId: string;
}

export { UpdateOrderResponseDto, UpdateOrderDto };
