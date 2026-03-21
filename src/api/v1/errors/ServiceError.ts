import { HTTP_STATUS } from "../../../constants/httpStatus";
import { AppError } from "./AppError";

export class ServiceError extends AppError {
    constructor(message = "Service error") {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, "SERVICE_ERROR");
    }
}