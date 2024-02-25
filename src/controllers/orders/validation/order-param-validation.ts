import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';
import mongoose from 'mongoose';

const GetOrderByIdParamJoiValidation = asyncHandler(async (req, res, next) => {

    const vytalObject = Joi.object({
        id: Joi.string().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }),
    })

    const { error, value } = vytalObject.validate(req.params);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
});

export { GetOrderByIdParamJoiValidation }