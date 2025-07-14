import { App, initializeApp, getApps, cert } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth"; // Correct import for Firebase Admin Auth
import { OAuthUser } from "@/types";

import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from "@/config";

export default class FireBaseService {
  private firebaseAdminApp: App;
  private firebaseAuth: Auth;

  constructor() {
    if (!getApps().length) {
      try {
        this.firebaseAdminApp = initializeApp({
          credential: cert({
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY,
            projectId: FIREBASE_PROJECT_ID,
          }),
        });
      } catch (error) {
        throw new Error(
          `Firebase Admin SDK initialization failed: ${error instanceof Error ? error.message : error}`,
        );
      }
    } else {
      this.firebaseAdminApp = getApps()[0];
    }

    this.firebaseAuth = getAuth(this.firebaseAdminApp);
  }

  /**
   * Verifies a Firebase ID token and returns a simplified OAuthUser object.
   * @param accessToken The Firebase ID token to verify.
   * @returns A Promise that resolves to an OAuthUser object or null if verification fails.
   */
  async verifyAccessToken(accessToken: string): Promise<OAuthUser | null> {
    try {
      const decodedToken = await this.firebaseAuth.verifyIdToken(accessToken);

      return {
        email: decodedToken.email,
        name: decodedToken.name,
        profile: decodedToken.picture,
      };
      //eslint-disable-next-line
    } catch (error: any) {
      throw new Error(
        `Firebase token verification via Admin SDK failed: ${error.message || "Unknown error"}`,
      );
    }
  }
}
