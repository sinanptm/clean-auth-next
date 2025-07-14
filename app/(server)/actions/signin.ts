"use server";

import { cookies } from 'next/headers';
import { tryCatch } from "@/lib/utils";
import FireBaseService from "@/lib/services/FireBaseService";
import connectDB from "@/lib/db/connectDb";
import UserRepository from "@/lib/db/repositories/UserRepository";
import JwtService from "@/lib/services/JwtService";

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

        const token = await jwtService.createToken({ email: user.email!, id: user._id! });

        // Set cookies after successful authentication
        const cookieStore = await cookies();

        // Set authentication token cookie
        cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });

        // Set user info cookie (non-sensitive data)
        cookieStore.set('user-info', JSON.stringify({
            id: user._id!,
            name: user.name!,
            profile: user.profile!
        }), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });

        return JSON.stringify({
            id: user._id!,
            name: user.name!,
            profile: user.profile!
        });
    });
};

export default signinAction;