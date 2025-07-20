export * from "./props";
export * from "./state";
export * from "./user";
export * from "./form";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}
export enum Tokens {
  User = "user_token",
  Admin = "admin_token",
}

export type DateString = Date | string;
