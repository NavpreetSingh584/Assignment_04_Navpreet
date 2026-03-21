import { HTTP_STATUS } from "../../../constants/httpStatus";
import { AppError } from "./AppError";

export class AuthorizationError extends AppError {
    constructor(message = "Access denied") {
        super(message, HTTP_STATUS.FORBIDDEN, "AUTHORIZATION_ERROR");
    }
}