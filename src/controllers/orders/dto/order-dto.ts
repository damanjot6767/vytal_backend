import { OrderStatus, OrderType } from "../../../constants";
import { User } from "../../users/dto/user-dto";
import { Vytal } from "../../vytals/dto/vytal-dto";

interface Order {
  _id: string;
  type: OrderType;
  status: OrderStatus;
  vytal: Vytal;
  user: User;
  createdAt: Date;
  updatedAt: Date
}

interface OrderResponseDto extends Order {
}

export { Order, OrderResponseDto }


