import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = { headers: {} };
        mockResponse = { locals: {} };
        nextFunction = jest.fn();
    });

    it("should pass AuthenticationError to next() when no token is provided", async () => {
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );

        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
    });

    it("should call next() with no error when token is valid", async () => {
        (auth.verifyIdToken as jest.Mock).mockResolvedValue({
            uid: "user123",
            role: "admin",
        });

        mockRequest = {
            headers: {
                authorization: "Bearer validToken",
            },
        };
        mockResponse = { locals: {} };

        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction
        );

        expect(mockResponse.locals).toEqual({
            uid: "user123",
            role: "admin",
        });
        expect(nextFunction).toHaveBeenCalledWith();
    });
});