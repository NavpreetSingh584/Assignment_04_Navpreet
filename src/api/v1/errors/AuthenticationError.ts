import { HTTP_STATUS } from "../../../constants/httpStatus";
import { AppError } from "./AppError";

export class AuthenticationError extends AppError {
    constructor(message = "Authentication failed") {
        super(message, HTTP_STATUS.UNAUTHORIZED, "AUTHENTICATION_ERROR");
    }
}