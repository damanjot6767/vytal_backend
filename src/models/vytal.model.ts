import mongoose, { Schema, Document, Types } from 'mongoose';
import { ApiError } from '../utils/api-error';
import { CreateVytalResponseDto, VytalResponseDto } from '../controllers/vytals/dto';



export const vytalSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        qrCodeUrl: {
            type: String,
            required: true
        },
        restaurantId:
        {
            type: Schema.Types.ObjectId,
            ref: "Restarants"
        }
    },
    {
        timestamps: true
    }
)

export const VytalModel = mongoose.model('Vytals', vytalSchema);


//Message Services

export const findVytalById = async (id: string): Promise<VytalResponseDto> => {
    try {
        const vytal: any = await VytalModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'restaurants',
                    localField: 'restaurantId',
                    foreignField: '_id',
                    as: 'restaurant'
                }
            },
            {
                $unwind: '$restaurant'
            },
            {
                $project: {
                    "restaurant.password": 0,
                    "restaurant.refreshToken": 0
                }
            }
        ]);

        if (!vytal.length) throw new ApiError(401, 'Vytal not found ')
        return vytal[0]
    } catch (error) {
        throw new ApiError(500, "Something went wrong while finding vytal by id")
    }
}


export const createVytal = <VytalPayload>(values: VytalPayload): Promise<CreateVytalResponseDto> => VytalModel.create(values);
export const deleteVytalById = (id: string): any => VytalModel.findOneAndDelete({ _id: id });
export const updateVytalById = <MesssagePayload>(id: string, values: MesssagePayload): Promise<CreateVytalResponseDto> => VytalModel.findByIdAndUpdate(id, values, { new: true });


