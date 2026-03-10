import type { User } from "@/app/data/types/index.js";

/**
 * Contract for user storage. All store implementations (memory, json, mongo, firebase)
 * implement this interface and can be swapped via config.
 */
export interface IUserStore {
  addUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
}
