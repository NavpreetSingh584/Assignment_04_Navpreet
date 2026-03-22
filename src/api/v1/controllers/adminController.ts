import { Request, Response, NextFunction } from "express";

import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Handles setting roles (custom claims in Firebase) for a user
 */
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid, roles } = req.body;

        await auth.setCustomUserClaims(uid, roles);

        res.status(HTTP_STATUS.OK).json(
            successResponse({}, `Custom claims set for user: ${uid}`)
        );
    } catch (error: unknown) {
        next(error);
    }
};