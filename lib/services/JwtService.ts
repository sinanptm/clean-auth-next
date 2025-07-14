import { SignJWT, jwtVerify, errors } from "jose";
import { TOKEN_SECRET } from "@/config";

type TokenPayLoad = {
  name: string;
  id: string;
  profile?: string;
};

export default class JwtService {
  private secret = new TextEncoder().encode(TOKEN_SECRET);

  async createToken({ name, id, profile }: TokenPayLoad): Promise<string> {
    const jwt = new SignJWT({ name, id, profile })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d");

    return await jwt.sign(this.secret);
  }

  async verifyToken(token: string): Promise<TokenPayLoad> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      return {
        name: payload.name as string,
        id: payload.id as string,
        profile: payload.profile as string | undefined,
      };
    } catch (error) {
      if (error instanceof errors.JWTExpired) {
        throw new Error("Token expired");
      }
      throw new Error("Invalid token");
    }
  }
}
