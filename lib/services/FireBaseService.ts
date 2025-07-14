import * as admin from "firebase-admin";
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from "@/config";
import { OAuthUser } from "@/types";

export default class FireBaseService {
  private firebaseAdminApp: admin.app.App;
  private firebaseAuth: admin.auth.Auth;

  constructor() {
    if (!admin.apps.length) {
      try {
        this.firebaseAdminApp = admin.initializeApp({
          credential: admin.credential.cert({
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY,
            projectId: FIREBASE_PROJECT_ID,
          }),
        });
      } catch (error) {
        throw new Error(`Firebase Admin SDK initialization failed: ${error}`);
      }
    } else {
      this.firebaseAdminApp = admin.app();
    }
    this.firebaseAuth = this.firebaseAdminApp.auth();
  }

  async verifyAccessToken(accessToken: string): Promise<OAuthUser | null> {
    try {
      const decodedToken = await this.firebaseAuth.verifyIdToken(accessToken);

      return {
        email: decodedToken.email,
        name: decodedToken.name,
        profile: decodedToken.picture,
      };
    } catch (error: any) {
      throw new Error("Firebase token verification via Admin SDK failed:");
    }
  }
}
