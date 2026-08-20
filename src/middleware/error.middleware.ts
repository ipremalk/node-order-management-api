import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Resource already exists"
        });
    }
    return res.status(500).json({
        message: "Internal server error"
    });
};
