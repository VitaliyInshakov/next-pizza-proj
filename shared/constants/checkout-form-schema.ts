import { z } from "zod";

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "Name must contain at least 2 characters" }),
	lastName: z
		.string()
		.min(2, { message: "Surname must contain at least 2 characters" }),
	email: z.string().email({ message: "Enter correct email" }),
	phone: z.string().min(10, { message: "Enter correct phone number" }),
	address: z.string().min(5, { message: "Enter correct address" }),
	comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
