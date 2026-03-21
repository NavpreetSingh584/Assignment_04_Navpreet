import { HTTP_STATUS } from "../../../constants/httpStatus";
import { AppError } from "./AppError";

export class RepositoryError extends AppError {
    constructor(message = "Repository error") {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, "REPOSITORY_ERROR");
    }
}