import { User } from "../models/user.model.js";

export const createUserService = async (name: string, email: string) => {
    return User.create({ name, email });
};

export const getUsersService = async (page: number, limit: number, search: string, sortBy: string, order: 1 | -1) => {
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
                email: {
                    $regex: search,
                    $options: "i",
                }
            }
        ]
    }

    const users = await User.find(filter)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);
    const total = await User.countDocuments();

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
