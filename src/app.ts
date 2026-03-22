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

// Middleware START
            app.use(accessLogger);
            app.use(errorLogger);
            app.use(consoleLogger);

            app.use(express.json());
            app.use("/api/v1", loanRoutes);
// Middleware END

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

// Error handler (must be last)
        app.use(errorHandler);

export default app;