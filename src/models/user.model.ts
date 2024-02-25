import mongoose, { Schema, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/api-error";
import {
  CreateUserResponseDto,
  UserResponseDto,
} from "../controllers/users/dto/index";
import {
  AvailableSocialLogins,
  AvailableStatusType,
  AvailableUserType,
  StatusType,
  UserLoginType,
  UserType,
} from "../constants";

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullName: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String, // cloudinary url
      default: null,
    },
    address: {
      latitude: { type: Number, default: null},
      longitude: { type: Number, default: null},
      addressLine1: { type: String, default: null},
      addressLine2: { type: String },
      city: { type: String, default: null},
      state: { type: String, default: null},
      country: { type: String, default: null},
      postalCode: { type: String, default: null},
    },
    loginType: {
      type: String,
      enum: Object.values(AvailableSocialLogins),
      default: UserLoginType.EMAIL_PASSWORD,
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
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(AvailableStatusType),
      default: StatusType.ACTIVE,
    },
    type: {
      type: String,
      enum: Object.values(AvailableUserType),
      default: UserType.USER,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
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
userSchema.methods.generateRefreshToken = function () {
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
userSchema.methods.generateTempraryToken = function () {
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

export const UserModel = mongoose.model("User", userSchema);

// User Services
export const findUserByEmail = (email: string): Promise<UserResponseDto> =>
  UserModel.findOne({ email });

export const findUserByLoginCredential = async (
  email: string,
  password: string
): Promise<UserResponseDto> => {
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) throw new ApiError(400, "Invalis credentials");

    delete user._doc.password; //exclude delete key from doc object
    return user._doc;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

export const findUserById = async (id: string): Promise<UserResponseDto> => {
  try {
    const user = await UserModel.findOne({ _id: id });

    if (user) {
      return user._doc;
    }

    throw new ApiError(401, "User not found");
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding user by id");
  }
};

export const createUser = <UserPayload>(
  values: UserPayload
): Promise<CreateUserResponseDto> => UserModel.create(values);

export const deleteUserById = (id: string): any =>
  UserModel.findOneAndDelete({ _id: id });
  
export const updateUserById = <UserPayload>(
  id: string,
  values: UserPayload
): Promise<CreateUserResponseDto> =>
  UserModel.findByIdAndUpdate(id, values, { new: true });

export const changePassword = async (
  userId: string,
  newPassword: string
): Promise<UserResponseDto> => {
  try {
    newPassword = await bcrypt.hash(newPassword, 10);
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
