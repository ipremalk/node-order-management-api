import { User } from "../models/user.model.js";

export const createUserService = async (name: string, email: string) => {
    return User.create({ name, email });
};

export const getUsersService = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const users = User.find({}).skip(skip).limit(limit);
    const total = User.countDocuments();

    return { users, total };
};

export const getUserByIdService = async (id: string) => {
    return User.findById(id);
};

export const updateUserService = async (id: string, updateData: { name?: string, email?: string }) => {
    return User.findByIdAndUpdate(id, updateData);
};

export const deleteUserService = async (id: string) => {
    return User.findByIdAndDelete(id);
};
