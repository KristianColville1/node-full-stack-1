/**
 * Contract for cafe storage: CRUD, query, group by category.
 */
export interface ICafeStore {
  addCafe(cafe: any): any;
  getCafeById(id: string): any;
  getAllCafes(): any;
  updateCafe(id: string, cafe: any): any;
  deleteCafe(id: string): any;
  getByCategory(category: string): any;
}
