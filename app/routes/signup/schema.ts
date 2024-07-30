import z from "zod";

export const validateName = z.string().min(2);
export const validateEmail = z.string().email();
export const validatePassword = z.string().min(8);
export const validateRole = z.string(z.enum(["user", "admin"]));
export const validateSecretKey = z.string().optional().nullable();
