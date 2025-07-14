"user server";

import { tryCatch } from "@/lib/utils";
import FireBaseService from "@/lib/services/FireBaseService";
import connectDB from "@/lib/db/connectDb";
import UserRepository from "@/lib/db/repositories/UserRepository";
import JwtService from "@/lib/services/JwtService";

const firebase = new FireBaseService();
const userRepository = new UserRepository();
const jwtService = new JwtService();

connectDB();

const signinAction = async (accessToken: string) => {
    return await tryCatch(async () => {
        // Replace with your actual sign-in logic
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

        const token = jwtService.createToken({ email: user.email!, id: user._id! });

        // we need set cookies, using next.js thigns and ret


        return "Signin Successfully";
    });
};

export default signinAction;
