import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./server";
// export * from './api';
export * from "./localStorage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
