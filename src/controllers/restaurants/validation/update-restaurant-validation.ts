import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const UpdateRestaurantJoiValidation = asyncHandler(async (req, res, next) => {

    const RestaurantObject = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        address: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            postalCode: Joi.string().required()
        }).optional().or('latitude', 'longitude', 'addressLine1', 'addressLine2', 'city', 'state', 'country', 'postalCode'),
    })

    const { error, value } = RestaurantObject.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { UpdateRestaurantJoiValidation }