import { v4 as uuidv4 } from "uuid";
import type { ICafeStore } from "@/app/data/stores/interfaces/index.js";
import type { Cafe } from "@/app/data/types/index.js";

/**
 * In-memory cafe store. CRUD, query, group by category.
 */
export class MemoryCafeStore implements ICafeStore {
  private cafes: Map<string, Cafe> = new Map();

  async addCafe(cafe: Cafe): Promise<void> {
    const id = uuidv4();
    this.cafes.set(id, { ...cafe, _id: id });
  }

  async getCafeById(id: string): Promise<Cafe | undefined> {
    return this.cafes.get(id);
  }

  async getAllCafes(): Promise<Cafe[]> {
    return Array.from(this.cafes.values());
  }

  async updateCafe(id: string, cafe: Partial<Cafe>): Promise<void> {
    const existing = this.cafes.get(id);
    if (!existing) return;
    this.cafes.set(id, { ...existing, ...cafe });
  }

  async deleteCafe(id: string): Promise<void> {
    this.cafes.delete(id);
  }

  async getByCategory(category: string): Promise<Cafe[]> {
    const all = await this.getAllCafes();
    return all.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }
}
