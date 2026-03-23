import morgan from "morgan";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";

// ensure the logs directory actually exists '/logs'
const logsDirectory: string = path.join(__dirname, "../../../logs");

if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory, { recursive: true });
}

// creating a write stream for access logs
const accessLogStream = fs.createWriteStream(
    path.join(logsDirectory, "access.log"),
    { flags: "a" }
);

// creating a write stream for error logs
const errorLogStream = fs.createWriteStream(
    path.join(logsDirectory, "error.log"),
    { flags: "a" }
);

// log all requests
const accessLogger = morgan("combined", { stream: accessLogStream });

// only logging requests if status is 4XX or 5XX
const errorLogger = morgan("combined", {
    stream: errorLogStream,
    skip: (_req: Request, res: Response) => res.statusCode < 400,
});

// console logger for development
const consoleLogger = morgan("dev");

export { accessLogger, errorLogger, consoleLogger };