// utils/ApiError.ts


class ApiError extends Error {
    public statusCode: number;
    public message: string;
    public errors: Array<any>;
    public stack?: string;
    public success: boolean;
    public data: any | null;

    constructor(
        statusCode = 500,
        message = "Something went wrong",
        errors: Array<any> = [],
        stack = "",
        data: any = null
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.stack = stack;
        this.success = false;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ApiResponse<T = any> {
    public statusCode: number;
    public data: T;
    public message: string;
    public success: boolean;

    constructor(statusCode: number, data: T, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse, ApiError };
