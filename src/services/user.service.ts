import { User } from "../models/user.model.js";

export const createUserService = async (name: string, email: string) => {
    return User.create({ name, email });
};

export const getUsersService = async () => {
    return User.find({});
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
