import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import { AvailableOrderStatus } from '../../../constants';
import mongoose from 'mongoose';

const UpdateOrderJoiValidation = asyncHandler(async (req, res, next) => {

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
        orderId: Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }),
        status: Joi.string().valid(AvailableOrderStatus)
    })

    const { error, value } = orderObject.validate(req.body);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
});

export { UpdateOrderJoiValidation }