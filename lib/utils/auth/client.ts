"use client";

import { AuthUser } from "@/types";

export class AuthClientUtils {
  // Get user info from cookies (client-side)
  static getUserInfo(): AuthUser | null {
    if (typeof window === "undefined") return null;

    try {
      const cookies = document.cookie.split(";");
      const userInfoCookie = cookies.find((cookie) => cookie.trim().startsWith("user-info="))?.split("=")[1];

      if (!userInfoCookie) return null;

      return JSON.parse(decodeURIComponent(userInfoCookie)) as AuthUser;
    } catch (error) {
      console.error("Error getting user info from client:", error);
      return null;
    }
  }

  // Check if user is authenticated (client-side)
  static isAuthenticated(): boolean {
    return this.getUserInfo() !== null;
  }

  // Clear all auth cookies (client-side)
  static clearAuthCookies(): void {
    if (typeof window === "undefined") return;

    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user-info=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
