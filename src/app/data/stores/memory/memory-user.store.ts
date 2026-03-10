import { v4 as uuidv4 } from "uuid";
import type { IUserStore } from "@/app/data/stores/interfaces/index.js";
import type { User } from "@/app/data/types/index.js";

/**
 * In-memory user store. No persistence; data lives in process memory.
 * Same interface as other stores so it can be swapped via config.
 */
export class MemoryUserStore implements IUserStore {
  private users: Map<string, User> = new Map();

  async addUser(user: User): Promise<void> {
    const id = uuidv4();
    this.users.set(user.email.toLowerCase(), { ...user, _id: id });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.get(email.toLowerCase());
  }
}
