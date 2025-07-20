import { DateString } from ".";

export interface IUserProfile {
  readonly _id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly profile?: string;
}

export interface IUser extends IUserProfile {
  readonly isBlocked?: boolean;
  readonly password?: string;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  readonly token?: string;
}

export type UserProfilePromise = Promise<IUserProfile | null>;
export type UserPromise = Promise<IUser | null>;

export interface AuthUser extends Pick<IUser, "email" | "name" | "profile"> {
  id: string;
}
