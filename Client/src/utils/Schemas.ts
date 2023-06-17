import { z } from "zod";

export const RegisterFormSchema = z.object({
	username: z.string().min(8),
	password: z
		.string()
		.min(8)
		.refine((v) => /\d/.test(v) && /[A-Za-z]/.test(v)),
	email: z.string().email(),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	avatar: z.string().url().or(z.string().length(0))
});

export const ProfileFormSchema = z.object({
	username: z.string().min(8),
	email: z.string().email(),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	avatar: z.string().url().or(z.string().length(0))
});
