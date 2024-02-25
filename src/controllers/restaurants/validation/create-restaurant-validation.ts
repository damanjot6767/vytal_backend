import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const CreateRestaurantJoiValidation = asyncHandler(async (req, res, next) => {

    const RestaurantObject = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().min(3).max(30).required(),
        password: Joi.string().required(),
        address: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            postalCode: Joi.string().required()
        }).required()
    })

    const { error, value } = RestaurantObject.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateRestaurantJoiValidation }