import type { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "../models/user.model.js";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                "message": "name and email are required"
            });
        }
        const user = await User.create({ name, email });
        return res.status(201).json({
            "message": "User is created",
            user
        });
    } catch (err: any) {
        if (err?.code === 11000) {
            return res.status(409).json({
                "message": "User with this email already exists"
            });
        }
        return res.status(500).json({
            "message": "Internal server error"
        });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
     try {
            const users = await User.find({});
            
            return res.status(200).json({
                users
            });
        } catch (err) {
            return res.status(500).json({
                "message": "Internal server error"
            });
        }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
            const { id } = req.params as { id: string };
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    "message": "Invalid user ID"
                });
            }
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({
                    "message": "User not found"
                });
            }
            return res.status(200).json({
                user
            });
        } catch (err) {
            return res.status(500).json({
                "message": "Internal server error"
            });
        }
};

export const updateUser = async (req: Request, res: Response) => {
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
        const update = await User.findByIdAndUpdate(id, updateObject, { new: true });
        if (!update) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User updated"
        });

    } catch (err) {
        return res.status(500).json({
            "message": "Internal server error"
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "message": "Invalid user ID"
            });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                "message": "User not found"
            });
        }
        return res.status(200).json({
            "message": "User deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            "message": "Internal server error"
        });
    }
};
