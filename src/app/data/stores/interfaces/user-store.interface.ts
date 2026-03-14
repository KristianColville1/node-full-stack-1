/**
 * Contract for user storage. Implementations (memory, json, mongo, etc.) can be swapped via config.
 */
export interface IUserStore {
  addUser(user: any): any;
  getUserByEmail(email: string): any;
  getUserById(id: string): any;
}
