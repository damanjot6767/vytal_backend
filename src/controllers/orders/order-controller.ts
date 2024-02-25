import { OrderStatus, OrderType, UserType } from "../../constants";
import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import {
    getOrderService,
    createOrderService,
    updateOrderService,
    deleteOrderService,
    getAllOrdersByUserService,
    getAllOrdersByRestaurantService
} from "./order-service";


export const createOrder = asyncHandler(async (req, res) => {

    const paylod = req.body.type === OrderType.IN_PERSON ?
        {
            ...req.body,
            status: OrderStatus.ACCEPT
        } :
        {
            ...req.body,
            status: OrderStatus.REQUEST,
        }

    const response = await createOrderService(paylod)

    res.
        status(201).
        json(
            new ApiResponse(
                201, response, 'Order create successfully.'
            )
        )
})

export const getOrder = asyncHandler(async (req, res) => {

    const response = await getOrderService(req.params?.id)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Order get successfully'
            )
        )
})

export const getAllOrdersByUser = asyncHandler(async (req, res) => {

    const response = await getAllOrdersByUserService(req.user._id)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Orders get successfully'
            )
        )
})

export const getAllOrdersByRestaurant = asyncHandler(async (req, res) => {

    const response = await getAllOrdersByRestaurantService(req.user._id)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Orders get successfully'
            )
        )
})


export const updateOrder = asyncHandler(async (req, res) => {

    const response = await updateOrderService(req.user ,req.params.id, req.body)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Order update successfully'
            )
        )
})

export const deleteOrder = asyncHandler(async (req, res) => {

    const response = await deleteOrderService(req.params.id)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Order delete successfully'
            )
        )
})