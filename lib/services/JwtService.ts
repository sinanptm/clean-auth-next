import { SignJWT, jwtVerify, errors } from "jose";
import { TOKEN_SECRET } from "@/config";
import { AuthUser } from "@/types";

interface TokenPayLoad extends AuthUser {
  id: string;
}

export default class JwtService {
  private secret = new TextEncoder().encode(TOKEN_SECRET);

  /**
   * Creates a new JWT token.
   *
   * @param payload - The payload to include in the token.
   * @returns A promise that resolves to the JWT token.
   */
  async createToken({ name, id, profile, email }: TokenPayLoad): Promise<string> {
    const jwt = new SignJWT({ name, id, profile, email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d");

    return await jwt.sign(this.secret);
  }

  /**
   * Verifies a JWT token.
   *
   * @param token - The JWT token to verify.
   * @returns A promise that resolves to the decoded token payload.
   * @throws An error if the token is expired or invalid.
   */
  async verifyToken(token: string): Promise<TokenPayLoad> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      return {
        name: payload.name as string,
        id: payload.id as string,
        profile: payload.profile as string | undefined,
        email: payload.email as string | undefined,
      };
    } catch (error) {
      if (error instanceof errors.JWTExpired) {
        throw new Error("Token expired");
      }
      throw new Error("Invalid token");
    }
  }
}
