import { ApiError } from "../../utils/api-error";
import {
    createVytal,
    deleteVytalById,
    findVytalById,
    updateVytalById
} from "../../models/vytal.model";
import { CreateVytalDto, CreateVytalResponseDto } from "./dto/create-vytal-dto";
import { UpdateVytalDto, VytalResponseDto } from "./dto";

export const createService = async (
    vytalCreateDto: CreateVytalDto,
): Promise<CreateVytalResponseDto> => {

    const vytalResponse = await createVytal(vytalCreateDto)
    return vytalResponse
}

export const getVytalService = async (
    id: string,
): Promise<VytalResponseDto> => {

    const vytal = await findVytalById(id)
    return vytal
}

export const updateVytalService = async (
    id: string,
    updateVytalDto: UpdateVytalDto
): Promise<VytalResponseDto> => {

    const vytal = await updateVytalById(id, updateVytalDto)
    return vytal
}

export const deleteVytalService = async (
    id: string,
): Promise<VytalResponseDto> => {

    const vytal = await deleteVytalById(id)
    return vytal
}