import { v4 as uuidv4 } from "uuid";
import type { IUserStore } from "@/app/data/stores/interfaces/index.js";

/**
 * In-memory user store. No persistence; data lives in process memory.
 */
export class MemoryUserStore implements IUserStore {
  private users = new Map();

  async addUser(user) {
    const id = uuidv4();
    this.users.set(user.email.toLowerCase(), { ...user, _id: id });
  }

  async getUserByEmail(email) {
    return this.users.get(email.toLowerCase());
  }

  async getUserById(id) {
    return this.users.get(id);
  }
}
