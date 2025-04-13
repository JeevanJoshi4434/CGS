import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

export const response = <T>(
    res: Response,
    statusCode: number,
    message?: string,
    data?: T
): Response<ApiResponse<T>> => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message,
        data
    });
};