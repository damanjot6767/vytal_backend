import { Router } from "express";
import { verifyRestaurantJWT } from "../middlewares/auth-middleware";
import { CreateVytalJoiValidation, UpdateVytalJoiValidation } from "../controllers/vytals/validation";
import { createVytal, deleteVytal, getVytal, updateVytal } from "../controllers/vytals/vytal-controller";
import { GetVytalByIdParamJoiValidation } from "../controllers/vytals/validation/vytal-param-validation";


const router = Router();;;

router.route('/create').post(
    verifyRestaurantJWT,
    CreateVytalJoiValidation,
    createVytal
)

router.route('/:id').get(
    verifyRestaurantJWT,
    getVytal
)

router.route('/update/:id').post(
    verifyRestaurantJWT,
    UpdateVytalJoiValidation,
    updateVytal
)

router.route('/delete/:id').delete(
    verifyRestaurantJWT,
    GetVytalByIdParamJoiValidation,
    deleteVytal
)

export default router;