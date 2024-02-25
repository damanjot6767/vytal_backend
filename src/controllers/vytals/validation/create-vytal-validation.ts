import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import mongoose from 'mongoose';

const CreateVytalJoiValidation = asyncHandler(async (req, res, next) => {

    const vytalObject = Joi.object({
        title: Joi.string().required(),
        imageUrl: Joi.string().required(),
        qrCodeUrl: Joi.string().required(),
        restaurantId: Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
    })

    const { error, value } = vytalObject.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateVytalJoiValidation }