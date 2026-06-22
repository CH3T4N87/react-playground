 import z from "zod";

 export const zLoginSchema = z.object({
        email: z.email("Invalid email"),
    })