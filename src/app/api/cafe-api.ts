import { db } from "@/core/data/db.js";
import { validationError } from "@/app/api/logger.js";

/** Cafe API: CRUD and getByCategory. JSON only. */
export const cafeApi = {
  /** GET /api/cafes — List all cafes. */
  list: {
    handler: async function (request, h) {
      const cafes = await db.cafeStore.getAllCafes();
      return h.response(cafes).code(200);
    },
  },
  /** GET /api/cafes/{id} — One cafe; 404 if missing. */
  getOne: {
    handler: async function (request, h) {
      const { id } = request.params;
      const cafe = await db.cafeStore.getCafeById(id);
      if (!cafe) return h.response({ error: "Not found" }).code(404);
      return h.response(cafe).code(200);
    },
  },
  /** POST /api/cafes — Create cafe, return created (201). */
  create: {
    handler: async function (request, h) {
      try {
      const cafe = request.payload;
        const created = await db.cafeStore.addCafe(cafe);
        if (created) {
          return h.response(created).code(201);
        }
        throw new Error("Failed to create cafe");
      } catch (error) {
        return validationError(request, h, error);
      }
    },
  },
  /** PUT /api/cafes/{id} — Update cafe; 404 if missing. */
  update: {
    handler: async function (request, h) {
      const { id } = request.params;
      const { name, category, description, analytics, userId } = request.payload;
      const existing = await db.cafeStore.getCafeById(id);
      if (!existing) return h.response({ error: "Not found" }).code(404);
      await db.cafeStore.updateCafe(id, {
        name,
        category,
        description: description || "",
        analytics,
        userId,
      });
      const updated = await db.cafeStore.getCafeById(id);
      return h.response(updated).code(200);
    },
  },
  /** DELETE /api/cafes/{id} — Remove cafe; 404 if missing, 204 on success. */
  remove: {
    handler: async function (request, h) {
      const { id } = request.params;
      const existing = await db.cafeStore.getCafeById(id);
      if (!existing) return h.response({ error: "Not found" }).code(404);
      await db.cafeStore.deleteCafe(id);
      return h.response().code(204);
    },
  },
  /** GET /api/cafes/category/{category} — Cafes in category. */
  getByCategory: {
    handler: async function (request, h) {
      const { category } = request.params;
      const cafes = await db.cafeStore.getByCategory(category);
      return h.response(cafes).code(200);
    },
  },
};
