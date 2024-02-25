import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';


const LoginRestaurantJoiValidation = asyncHandler(async (req, res, next) => {

    const RestarantObject = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error, value } = RestarantObject.validate(req.body);

    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { LoginRestaurantJoiValidation } 