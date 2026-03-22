import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

export const getLoans = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(HTTP_STATUS.OK).json(
            successResponse([], "Loans retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(HTTP_STATUS.CREATED).json(
            successResponse({}, "Loan created successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const updateLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(HTTP_STATUS.OK).json(
            successResponse({}, "Loan updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const deleteLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(HTTP_STATUS.OK).json(
            successResponse({}, "Loan deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};