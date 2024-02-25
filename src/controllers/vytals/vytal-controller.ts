import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import {
    getVytalService,
    createService,
    updateVytalService,
    deleteVytalService
} from "./vytal-service";


export const createVytal = asyncHandler(async (req, res) => {

    const response = await createService(req.body)

    res.
        status(201).
        json(
            new ApiResponse(
                201, response, 'Vytal create successfully.'
            )
        )
})

export const getVytal = asyncHandler(async (req, res) => {

    const response = await getVytalService(req.params?.id)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Vytal get successfully'
            )
        )
})

export const updateVytal = asyncHandler(async (req, res) => {

    const response = await updateVytalService(req.params.id, req.body)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Vytal update successfully'
            )
        )
})

export const deleteVytal = asyncHandler(async (req, res) => {

    const response = await deleteVytalService(req.params.id)

    return res.
        status(200).
        json(
            new ApiResponse(
                201, response, 'Vytal delete successfully'
            )
        )
})