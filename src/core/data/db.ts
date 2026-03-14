import { MemoryCafeStore, MemoryUserStore } from "@/app/data/stores/memory/index.js";

/**
 * App db facade. Controllers use db.userStore, db.cafeStore.
 * Set STORAGE env or pass to initStores() to swap backend.
 */
export const db = {
  userStore: null as any,
  cafeStore: null as any,
};

export function initStores(storageType?: string) {
  const type = storageType ?? process.env.STORAGE ?? "memory";
  switch (type) {
    case "memory":
      db.userStore = new MemoryUserStore();
      db.cafeStore = new MemoryCafeStore();
      break;
    case "json":
      throw new Error("Json stores not yet implemented");
    case "mongo":
      throw new Error("Mongo stores not yet implemented");
    case "firebase":
      throw new Error("Firebase stores not yet implemented");
    default:
      throw new Error(`Unknown storage type: ${type}`);
  }
}
