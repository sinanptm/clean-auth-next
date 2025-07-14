"use server";

import { tryCatch } from "@/lib/utils";
import FireBaseService from "@/lib/services/FireBaseService";
import connectDB from "@/lib/db/connectDb";
import UserRepository from "@/lib/db/repositories/UserRepository";
import JwtService from "@/lib/services/JwtService";
import { AuthServerUtils } from "@/lib/utils/auth/server";

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

    const token = await jwtService.createToken({
      name: user.name!,
      id: user._id!,
      profile: user.profile,
    });

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
