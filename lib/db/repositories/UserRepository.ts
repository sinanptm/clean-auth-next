import { IUser, UserProfilePromise, UserPromise } from "@/types";
import UserModel from "../models/User";

export default class UserRepository {
  model = UserModel;
  credentials: string;

  constructor() {
    this.credentials = "-password -token -updatedAt -createdAt -isBlocked";
  }

  /**
   * Finds a user by their ID.
   *
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user's profile, or null if not found.
   */
  async findById(id: string): UserProfilePromise {
    return await this.model.findById(id).lean().select(this.credentials);
  }

  /**
   * Finds all users.
   *
   * @returns A promise that resolves to an array of all users.
   */
  async findAll(): Promise<IUser[]> {
    return await this.model.find().lean();
  }

  /**
   * Finds a user by their email.
   *
   * @param email - The email of the user to find.
   * @returns A promise that resolves to the user's profile, or null if not found.
   */
  async findByEmail(email: string): UserProfilePromise {
    return await this.model.findOne({ email }).lean().select(this.credentials);
  }

  /**
   * Finds a user by their ID, including credentials.
   *
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user, or null if not found.
   */
  async findByIdWithCredentials(id: string): UserPromise {
    return await this.model.findById(id).lean();
  }

  /**
   * Finds a user by their email, including credentials.
   *
   * @param email - The email of the user to find.
   * @returns A promise that resolves to the user, or null if not found.
   */
  async findByEmailWithCredentials(email: string): UserPromise {
    return await this.model.findOne({ email }).lean();
  }

  /**
   * Updates a user.
   *
   * @param id - The ID of the user to update.
   * @param entity - The updated user entity.
   * @returns A promise that resolves to the updated user.
   */
  async update(id: string, entity: IUser): UserPromise {
    return await this.model.findByIdAndUpdate(id, entity, { new: true }).lean();
  }

  /**
   * Deletes a user.
   *
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the user is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  /**
   * Creates a new user.
   *
   * @param payload - The user data to create.
   * @returns A promise that resolves to the created user.
   */
  async create(payload: IUser): Promise<IUser> {
    return await this.model.create(payload);
  }
}
