import { Request, Response, NextFunction } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

describe("isAuthorized middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = { params: {} };
        mockResponse = { locals: {} };
        nextFunction = jest.fn();
    });

    it("should call next() when user has required role", () => {
        mockResponse.locals = { uid: "user123", role: "admin" };

        const middleware = isAuthorized({ hasRole: ["admin", "manager"] });

        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith();
    });

    it("should pass AuthorizationError when no role is found", () => {
        mockResponse.locals = { uid: "user123" };

        const middleware = isAuthorized({ hasRole: ["admin"] });

        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );

        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: No role found");
        expect(error.code).toBe("ROLE_NOT_FOUND");
    });
});