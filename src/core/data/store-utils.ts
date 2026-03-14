import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import * as fs from "fs";

/**
 * Initializes and returns a LowDB store for the given name.
 * @param {string} name - The name of the data to store (used as filename and key).
 * @returns {Low} The initialized LowDB instance.
 */
export function initStore(name) {
  const store = {
    file: `/data/${name}.json`,
    [name]: [],
  };
  const db = new Low<Record<string, any[]>>(new JSONFile(store.file), store as any);
  if (!fs.existsSync(store.file)) {
    fs.writeFileSync(store.file, JSON.stringify(store));
  }
  return db;
}
