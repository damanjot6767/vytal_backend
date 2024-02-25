import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../utils/async-handler';
import { findUserById } from '../models/user.model';
import { User } from '../controllers/users/dto/user-dto';
import { findRestaurantById } from '../models/restaurant.model';
import { Restaurant } from '../controllers/restaurants/dto/restaurant-dto';
import { UserType } from '../constants';

declare module 'express-serve-static-core' { // handle req.user typescript error
    interface Request {
        user: User | Restaurant
    }
}



const verifyUserJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header('Authorization')?.split(' ')?.[1];

    if (!token) {
        throw new ApiError(401, 'Unauthorized request')
    }

    const decodeToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodeToken.type === 'restaurant') {
        throw new ApiError (401, 'Unauthorized request')
    }

    const user: any = await findUserById(decodeToken?._id);
    req.user = user;
    next()
})

const verifyUserMailJWT = asyncHandler(async (req, res, next) => {

    const token = req.query.token as string

    if (!token) {
        throw new ApiError(401, 'Unauthorized request')
    }

    const decodeToken: any = jwt.verify(token, process.env.TEMPRARY_TOKEN_SECRET);
    if (decodeToken.type === 'restaurant') {
        throw new ApiError (401, 'Unauthorized request')
    }

    const user: any = await findUserById(decodeToken?._id)
    req.user = user
    next()
})

const verifyRestaurantJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header('Authorization')?.split(' ')?.[1];

    if (!token) {
        throw new ApiError(401, 'Unauthorized request')
    }

    const decodeToken: any = jwt.verify(token, process.env.TEMPRARY_TOKEN_SECRET);
    if (decodeToken.type === UserType.USER) {
        throw new ApiError (401, 'Unauthorized request')
    }

    const user: any = await findRestaurantById(decodeToken?._id);
    req.user = user;
    next()
})

const verifyRestaurantMailJWT = asyncHandler(async (req, res, next) => {

    const token = req.query.token as string

    if (!token) {
        throw new ApiError(401, 'Unauthorized request')
    }

    const decodeToken: any = jwt.verify(token, process.env.TEMPRARY_TOKEN_SECRET);
    if (decodeToken.type === UserType.USER) {
        new ApiError (401, 'Unauthorized request')
    }

    const user: any = await findRestaurantById(decodeToken?._id)
    req.user = user
    next()
})

export { verifyUserJWT, verifyUserMailJWT, verifyRestaurantJWT, verifyRestaurantMailJWT }
