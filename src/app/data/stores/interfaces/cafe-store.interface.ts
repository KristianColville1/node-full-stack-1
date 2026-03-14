import type { Cafe } from "@/app/data/types/index.js";

/**
 * Contract for cafe storage: CRUD, query, group by category.
 */
export interface ICafeStore {
  addCafe(cafe: Cafe): Promise<void>;
  getCafeById(id: string): Promise<Cafe | undefined>;
  getAllCafes(): Promise<Cafe[]>;
  updateCafe(id: string, cafe: Partial<Cafe>): Promise<void>;
  deleteCafe(id: string): Promise<void>;
  getByCategory(category: string): Promise<Cafe[]>;
}
