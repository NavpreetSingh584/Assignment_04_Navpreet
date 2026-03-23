import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/middleware/authenticate", () => {
    return jest.fn((req: any, res: any, next: any) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
    return jest.fn(
        () => (req: any, res: any, next: any) => next()
    );
});

describe("Loan Routes", () => {
    describe("GET /api/v1/loans", () => {
        it("should return 200 response", async () => {
            const res = await request(app)
                .get("/api/v1/loans")
                .set("Authorization", "Bearer mockedToken");

            expect(res.status).toBe(200);
        });
    });
});