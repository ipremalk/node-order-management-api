import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validate = (schema: ZodType) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { body, params, query } = req;
        const result = schema.safeParse({
            body,
            params,
            query,
        });
        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues
            });
        }
        next();
    };
};
