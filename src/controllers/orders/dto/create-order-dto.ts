import { OrderStatus, OrderType } from "../../../constants";
import { Order } from "./order-dto";

interface CreateOrderResponseDto extends Order {}

interface CreateOrderDto {
  userId: string;
  vytalId: string;
  status: OrderStatus;
  type: OrderType
}

export { CreateOrderResponseDto, CreateOrderDto };
