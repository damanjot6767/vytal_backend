import mongoose, { Schema, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
    AvailableStatusType,
    AvailableUserType,
    StatusType,
} from "../constants";
import { ApiError } from "../utils/api-error";
import {
    CreateRestaurantResponseDto,
    RestaurantDto,
} from "../controllers/restaurants/dto";
import { string } from "joi";

export const restaurantSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
          },
        name: {
            type: String,
        },
        description: {
            type: String,
            default: null,
        },
        address: {
            latitude: { type: Number, default: null },
            longitude: { type: Number, default: null },
            addressLine1: { type: String, default: null },
            addressLine2: { type: String },
            city: { type: String, default: null },
            state: { type: String, default: null },
            country: { type: String, default: null },
            postalCode: { type: String, default: null },
        },
        status: {
            type: String,
            enum: Object.values(AvailableStatusType),
            default: StatusType.UNACTIVE,
        },
        type: {
            type: String,
            default: "restaurant",
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

restaurantSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

restaurantSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

restaurantSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            ...this._doc,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
restaurantSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            ...this._doc,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
restaurantSchema.methods.generateTempraryToken = function () {
    return jwt.sign(
        {
            ...this._doc,
        },
        process.env.TEMPRARY_TOKEN_SECRET,
        {
            expiresIn: process.env.TEMPRARY_TOKEN_EXPIRY,
        }
    );
};

export const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

// Restaurant Services

export const findRestaurantByEmail = (email: string): Promise<RestaurantDto> =>
    RestaurantModel.findOne({ email });

export const findRestaurantByLoginCredential = async (
    email: string,
    password: string
): Promise<RestaurantDto> => {
    try {
        const restaurant = await RestaurantModel.findOne({ email }).select("+password");
        const isPasswordValid = await restaurant.isPasswordCorrect(password);

        if (!isPasswordValid) throw new ApiError(400, "Invalis credentials");

        delete restaurant._doc.password; //exclude delete key from doc object
        return restaurant._doc;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

export const findRestaurantById = async (
    id: string
): Promise<RestaurantDto> => {
    try {
        const restaurant: any = await RestaurantModel.findById({
            _id: new mongoose.Types.ObjectId(id),
        });

        if (!restaurant) throw new ApiError(400, 'Not found');
        return restaurant;
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while finding restaurant by id"
        );
    }
};

export const createRestaurant = <ChatPayload>(
    values: ChatPayload
): Promise<CreateRestaurantResponseDto> => RestaurantModel.create(values);

export const deleteRestaurantById = (id: string): any =>
    RestaurantModel.findOneAndDelete({ _id: id });

export const updateRestaurantById = <ChatPayload>(
    id: string,
    values: ChatPayload
): Promise<RestaurantDto> =>
    RestaurantModel.findByIdAndUpdate(id, values, { new: true });

export const changePassword = async (
    userId: string,
    newPassword: string
): Promise<RestaurantDto> => {
    try {
        newPassword = await bcrypt.hash(newPassword, 10);
        const restaurant = await RestaurantModel.findByIdAndUpdate(
            userId,
            { password: newPassword },
            { new: true }
        );
        return restaurant;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};
