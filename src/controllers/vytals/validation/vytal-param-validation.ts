import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const GetVytalByIdParamJoiValidation = asyncHandler(async (req, res, next) => {

    const vytalObject = Joi.object({
        id: Joi.string().required(),
    })

    const { error, value } = vytalObject.validate(req.params);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
});

export { GetVytalByIdParamJoiValidation }