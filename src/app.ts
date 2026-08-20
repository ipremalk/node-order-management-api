import express from "express";
import { User } from "./models/user.model.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "OK"
    });
});

app.post("/users", async (req, res) => {
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
});

app.get("/users", async (req, res) => {
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
});

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
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
        })
    }
});

app.patch("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
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
});

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
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
        })
    }
});

export default app;
