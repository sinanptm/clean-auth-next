"use server";

import { tryCatch } from "@/lib/utils";
import FireBaseService from "@/lib/services/FireBaseService";
import connectDB from "@/lib/db/connectDb";
import UserRepository from "@/lib/db/repositories/UserRepository";
import JwtService from "@/lib/services/JwtService";
import { AuthServerUtils } from "@/lib/utils/auth/server";

/**
 * Server action to handle user sign-in with Firebase access token.
 * Verifies the Firebase token, creates/updates user in the database, generates a JWT, and sets authentication cookies.
 *
 * @param accessToken - The Firebase access token.
 * @returns A JSON string of the user info if successful, or an error message.
 */
const signinAction = async (accessToken: string) => {
  await connectDB();
  const firebase = new FireBaseService();
  const userRepository = new UserRepository();
  const jwtService = new JwtService();

  return await tryCatch(async () => {
    const firebaseUser = await firebase.verifyAccessToken(accessToken);

    if (!firebaseUser) {
      throw new Error("Invalid Firebase token");
    }

    if (!firebaseUser.email) {
      throw new Error("Must have a email linked to your oauth provider");
    }

    let user = await userRepository.findByEmailWithCredentials(firebaseUser.email);

    if (!user) {
      user = await userRepository.create(firebaseUser);
    }

    if (user.isBlocked) {
      throw new Error("Your account has been blocked. Please contact support for assistance.");
    }

    if (!user.name || !user._id) {
      throw new Error("User is missing required fields (email or id)");
    }

    const token = await jwtService.createToken({ name: user.name!, id: user._id });

    const userInfo = {
      id: user._id!,
      name: user.name!,
      profile: user.profile!,
    };

    await AuthServerUtils.setAuthCookies(token, userInfo);

    return JSON.stringify(userInfo);
  });
};

export default signinAction;
