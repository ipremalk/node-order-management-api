import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { createUserService, getUserByIdService, getUsersService, deleteUserService, updateUserService } from "../services/user.service.js";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body;
        const user = await createUserService(name, email);
        return res.status(201).json({
            "message": "User is created",
            user
        });
    } catch (err: any) {
        next(err);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
     try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const search = String(req.query.search || "");
            const sortBy = String(req.query.sortBy || "createdAt");
            const order = req.query.order === "asc" ? 1 : -1;
            const { users, total }: any = await getUsersService(page, limit, search, sortBy, order);
            const totalPages = Math.ceil(total / limit);
            
            return res.status(200).json({
                page,
                limit,
                users,
                total,
                totalPages
            });
        } catch (err) {
            next(err);
        }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const { id } = req.params as { id: string };
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    "message": "Invalid user ID"
                });
            }
            const user = await getUserByIdService(id);
            if (!user) {
                return res.status(404).json({
                    "message": "User not found"
                });
            }
            return res.status(200).json({
                user
            });
        } catch (err) {
            next(err);
        }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const { name, email } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "message": "User ID is invalid"
            });
        }
        if (!name && !email) {
            return res.status(400).json({
                "message": "name or email must be required"
            });
        }
        const updateObject: { name? : string, email? : string } = {};
        if (name) updateObject.name = name;
        if (email) updateObject.email = email;
        const update = await updateUserService(id, updateObject);
        if (!update) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User updated"
        });

    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "message": "Invalid user ID"
            });
        }
        const user = await deleteUserService(id);
        if (!user) {
            return res.status(404).json({
                "message": "User not found"
            });
        }
        return res.status(200).json({
            "message": "User deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
