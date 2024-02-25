import { ApiError } from "../../utils/api-error";
import {
  createOrder,
  deleteOrderById,
  findAllOrdersByRestaurantId,
  findAllOrdersByUserId,
  findOrderById,
  updateOrderById
} from "../../models/order.model";
import { CreateOrderDto, CreateOrderResponseDto, OrderResponseDto, UpdateOrderDto } from "./dto";
import { findVytalById } from "../../models/vytal.model";
import { Restaurant } from "../restaurants/dto/restaurant-dto";


export const createOrderService = async (
  orderCreateDto: CreateOrderDto
): Promise<CreateOrderResponseDto> => {
  const vytal = await findVytalById(orderCreateDto.vytalId);

  const orderResponse = await createOrder({...orderCreateDto, restaurantId: vytal.restaurant._id});
  return orderResponse;
};

export const getOrderService = async (
  id: string
): Promise<OrderResponseDto> => {
  const order = await findOrderById(id);
  return order;
};

export const getAllOrdersByUserService = async (
  id: string
): Promise<OrderResponseDto> => {
  const orders = await findAllOrdersByUserId(id);
  return orders;
};

export const getAllOrdersByRestaurantService = async (
  id: string
): Promise<OrderResponseDto> => {
  const orders = await findAllOrdersByRestaurantId(id);
  return orders;
};

export const updateOrderService = async (
  user: any,
  id: string,
  updateOrderDto: UpdateOrderDto
): Promise<OrderResponseDto> => {

  const vytal = await findVytalById(updateOrderDto.vytalId);
  if (vytal.restaurant._id.toString() !== user._id.toString()) {
    throw new ApiError(400, 'Something went wrong while update order status')
  }

  const isExit = await findOrderById(updateOrderDto.orderId);
  if (isExit.user._id.toString() !== updateOrderDto.userId.toString()) {
    throw new ApiError(400, 'Something went wrong while update order status')
  }

  const order = await updateOrderById(id, updateOrderDto);
  return order;
};

export const deleteOrderService = async (
  id: string
): Promise<OrderResponseDto> => {
  const order = await deleteOrderById(id);
  return order;
};
