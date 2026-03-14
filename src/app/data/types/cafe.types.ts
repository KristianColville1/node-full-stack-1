/**
 * Cafe (POI) entity. Assignment: name, category, description, analytics, basic user.
 */
export interface Cafe {
  _id?: string;
  name: string;
  category: string;
  description: string;
  analytics?: { views?: number };
  userId?: string;
}
