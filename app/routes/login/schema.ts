import z from "zod";

export const validateEmail = z.string().email();
export const validatePassword = z.string().min(8);
