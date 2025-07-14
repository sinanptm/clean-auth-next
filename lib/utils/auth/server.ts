import { cookies } from "next/headers";
import JwtService from "@/lib/services/JwtService";
import { AuthUser } from "@/types";
import { NODE_ENV } from "@/config";

export class AuthServerUtils {
  private static jwtService = new JwtService();

  /**
   * Retrieves user information from the 'user-info' cookie.
   *
   * @returns A promise that resolves to the user information or null if not found.
   */
  static async getUserInfo(): Promise<AuthUser | null> {
    try {
      const cookieStore = await cookies();
      const userInfoCookie = cookieStore.get("user-info")?.value;

      if (!userInfoCookie) return null;

      return JSON.parse(userInfoCookie) as AuthUser;
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  }

  /**
   * Retrieves the authenticated user by verifying the JWT token from the 'auth-token' cookie.
   *
   * @returns A promise that resolves to the authenticated user or null if the token is invalid or not found.
   */
  static async getAuthUser(): Promise<AuthUser | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("auth-token")?.value;

      if (!token) return null;

      return await this.jwtService.verifyToken(token);
    } catch (error) {
      console.error("Error getting auth user:", error);
      return null;
    }
  }

  /**
   * Checks if the user is authenticated.
   *
   * @returns A promise that resolves to true if the user is authenticated, false otherwise.
   */
  static async isAuthenticated(): Promise<boolean> {
    const user = await this.getAuthUser();
    return user !== null;
  }

  /**
   * Sets the authentication cookies.
   *
   * @param token - The JWT token.
   * @param userInfo - The user information.
   * @returns A promise that resolves when the cookies are set.
   */
  static async setAuthCookies(token: string, userInfo: AuthUser): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user-info", JSON.stringify(userInfo), {
      httpOnly: false,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
}
