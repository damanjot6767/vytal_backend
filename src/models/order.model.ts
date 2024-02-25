import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import { AvailableOrderStatus, AvailableOrderType } from "../constants";
import { CreateOrderResponseDto, OrderResponseDto } from "../controllers/orders/dto";
import { ApiError } from "../utils/api-error";


const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    vytalId: {
      type: Schema.Types.ObjectId,
      ref: "vytals",
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
    },
    type: {
      type: String,
      enum: AvailableOrderType,
    },
    status: {
      type: String,
      enum: AvailableOrderStatus,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = model("Order", orderSchema);

// Order Services

export const findOrderById = async (id: string): Promise<OrderResponseDto> => {
  try {
    const order: any = await OrderModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "vytals",
          localField: "vytalId",
          foreignField: "_id",
          as: "vytal",
        },
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant"
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);

    if (!order.length) throw new ApiError(401, "Order not found ");
    return order[0];
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding vytal by id");
  }
};

export const findAllOrdersByUserId = async (id: string): Promise<OrderResponseDto> => {
  try {
    const order: any = await OrderModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "vytals",
          localField: "vytalId",
          foreignField: "_id",
          as: "vytal",
        },
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant"
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);

    if (!order.length) throw new ApiError(401, "Order not found ");
    return order[0];
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding vytal by id");
  }
};

export const findAllOrdersByRestaurantId = async (id: string): Promise<OrderResponseDto> => {
  try {
    const order: any = await OrderModel.aggregate([
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "vytals",
          localField: "vytalId",
          foreignField: "_id",
          as: "vytal",
        },
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant"
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);

    if (!order.length) throw new ApiError(401, "Order not found ");
    return order[0];
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding vytal by id");
  }
};

export const createOrder = <OrderPayload>(
  values: OrderPayload
): Promise<OrderResponseDto> => OrderModel.create(values);
export const deleteOrderById = (id: string): any =>
  OrderModel.findOneAndDelete({ _id: id });
export const updateOrderById = <OrderPayload>(
  id: string,
  values: OrderPayload
): Promise<CreateOrderResponseDto> =>
  OrderModel.findByIdAndUpdate(id, values, { new: true });
