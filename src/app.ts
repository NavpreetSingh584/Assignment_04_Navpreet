// import the express application and type definition
import express, { Application } from "express";
import path from "path";
import fs from "fs";

import healthRoutes from "./api/v1/routes/healthRoutes";
import loanRoutes from "./api/v1/routes/loanRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

import logger from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";

// initialize the express application
const app: Application = express();

// create logs directory if it does not already exist
const logsDir: string = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Middleware START

// Ensures incoming body is correctly parsed to JSON,
// otherwise req.body would be undefined
app.use(express.json());

// logger middleware
app.use(logger);

// Middleware END

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Route Imports START
// each route prefix connects to its own route file
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
// Route Imports END

// needs to be used last
app.use(errorHandler);

export default app;