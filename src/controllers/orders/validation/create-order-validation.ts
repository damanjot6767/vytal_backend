import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import mongoose from 'mongoose';
import { AvailableOrderType } from '../../../constants';

const CreateOrderJoiValidation = asyncHandler(async (req, res, next) => {

    const orderObject = Joi.object({
        userId: Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }),
        vytalId: Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }),
        type: Joi.string().valid(AvailableOrderType)
    })

    const { error, value } = orderObject.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateOrderJoiValidation }