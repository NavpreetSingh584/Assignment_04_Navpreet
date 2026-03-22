import express, { Express } from "express";
import errorHandler from "./api/v1/middleware/errorHandler";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import loanRoutes from "./api/v1/routes/loanRoutes";

        const app: Express = express();

        interface HealthCheckResponse {
            status: string;
            uptime: number;
            timestamp: string;
            version: string;
        }

        // 1. Logging middleware (first)
        if (process.env.NODE_ENV === "production") {
            app.use(accessLogger);
            app.use(errorLogger);
        } else {
            app.use(consoleLogger);
        }

// 2. Body parser
            app.use(express.json());

// 3. Routes
            app.use("/api/v1", loanRoutes);

// Root route
            app.get("/", (_req, res) => {
                res.send("Hello World");
            });

// Health check route
        app.get("/api/v1/health", (_req, res) => {
            const healthData: HealthCheckResponse = {
                status: "OK",
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                version: "1.0.0",
            };

            res.json(healthData);
});

// 4. Error handler (must be last)
        app.use(errorHandler);

export default app;