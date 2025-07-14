import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./server";

/**
 * A utility function to merge Tailwind CSS classes.
 *
 * @param inputs - A list of class values to merge.
 * @returns A string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
