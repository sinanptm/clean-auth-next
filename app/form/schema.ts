import { z } from "zod";

export const formSchema = z.object({
    // Personal Information
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),

    // Account & Security
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),

    // Location & Preferences
    country: z.string().min(1, "Select a country"),
    gender: z.enum(["male", "female", "other"]),

    // Professional Information
    experience: z.enum(["junior", "mid", "senior"]),
    workMode: z.enum(["remote", "hybrid", "onsite"]),
    framework: z.string().min(1, "Select a framework"),
    frameworks: z.array(z.string()).min(1, "Select at least one framework"),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.string()).min(1, "Select at least one language"),

    // Communication
    message: z.string().min(10, "Message must be at least 10 characters"),
    feedback: z.string().min(5, "Feedback is required"),
    priority: z.string().min(1, "Select priority level"),

    // Agreements & Notifications
    terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
    marketing: z.boolean(),
    updates: z.boolean(),
    newsletter: z.boolean(),
    notifications: z.boolean(),
    darkMode: z.boolean(),

    // File Uploads
    profile: z.any().refine((files) => files?.length == 1, "Profile picture is required"),
});

export type FormValues = z.infer<typeof formSchema>;
