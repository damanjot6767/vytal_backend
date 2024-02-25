import * as Joi from 'joi';
import { asyncHandler } from '../../../utils/async-handler';
import { ApiError } from '../../../utils/api-error';

const CreateUserJoiValidation = asyncHandler(async (req, res, next) => {

    const userObject = Joi.object({
        email: Joi.string().email().required(),
        fullName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
        password: Joi.string().required(),
    })

    const { error, value } = userObject.validate(req.body);
    
    if (error) {
        throw new ApiError(400, error.message)
    }
    next()
})

export { CreateUserJoiValidation }