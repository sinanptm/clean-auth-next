import { JwtPayload, TokenExpiredError, sign, verify, SignOptions } from "jsonwebtoken";
import { TOKEN_SECRET } from "@/config";

type TokenPayLoad = {
  email: string;
  id: string;
  profile?: string;
}

export default class JwtService {
  private signToken(payload: object, secret: string, options: SignOptions): string {
    return sign(payload, secret, { expiresIn: options.expiresIn });
  }
  private verify(token: string, secret: string): JwtPayload {
    try {
      return verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error("Token expired");
      }
      throw new Error("Invalid token");
    }
  }

  createToken({ email, id }: TokenPayLoad): string {
    return this.signToken({ email, id }, TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  }

  verifyToken(token: string): TokenPayLoad {
    const { email, id } = this.verify(token, TOKEN_SECRET!);
    return { email, id };
  }
}
