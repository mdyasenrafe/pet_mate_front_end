import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Please enter your full name." }),
  email: z.string().email({
    message:
      "The email address provided is not valid. Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Your password must be at least 6 characters long." }),
  profilePicture: z
    .string()
    .min(1, { message: "Profile picture URL cannot be empty" }),
});

export const signinSchema = z.object({
  email: z.string().email({
    message:
      "The email address provided is not valid. Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Your password must be at least 6 characters long." }),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
  address: z.string().optional(),
});
