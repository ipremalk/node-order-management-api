import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must contains atleast 2 characters"),
        email: z.string().email("Invalid email address")
    })
});
