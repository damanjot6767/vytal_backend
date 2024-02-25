import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const UpdateVytalJoiValidation = asyncHandler(async (req, res, next) => {

    const vytalObject = Joi.object({
        title: Joi.string().optional(),
        imageUrl: Joi.string().optional(),
        qrCodeUrl: Joi.string().optional(),
    })

    const { error, value } = vytalObject.validate(req.body);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
});

export { UpdateVytalJoiValidation }