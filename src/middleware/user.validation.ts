import type { NextFunction, Request, Response } from "express";

export const validationCreateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            message: "name and email are required"
        });
    }
    next();
};
