 /**
 * Interface representing a standard API response
 */
    interface ApiResponse<T> {
        status: string;
        data?: T;
        message?: string;
        error?: { message: string; code?: string };
        timestamp?: string;
    }

/**
 * Creates a success response object
 */
    export const successResponse = <T>(
        data: T,
        message?: string
    ): ApiResponse<T> => ({
        status: "success",
        data,
        message,
    });

/**
 * Creates a standardized error response object
 */
    export const errorResponse = (
        message: string,
        code?: string
    ): ApiResponse<null> => ({
        status: "error",
        error: { message, code },
        timestamp: new Date().toISOString(),
    });