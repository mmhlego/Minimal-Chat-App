import { z } from "zod";

export const RegisterFormSchema = z.object({
	username: z.string().min(8),
	password: z
		.string()
		.min(8)
		.refine((v) => /\d/.test(v) && /[A-Za-z]/.test(v)),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	avatar: z.string().url()
});

export const ProfileFormSchema = z.object({
	username: z.string().min(8),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	avatar: z.string().url()
});
