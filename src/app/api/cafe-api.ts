import { db } from "@/core/data/db.js";

export const cafeApi = {
  list: {
    handler: async function (request, h) {
      const cafes = await db.cafeStore.getAllCafes();
      return h.response(cafes).code(200);
    },
  },
  getOne: {
    handler: async function (request, h) {
      const { id } = request.params;
      const cafe = await db.cafeStore.getCafeById(id);
      if (!cafe) return h.response({ error: "Not found" }).code(404);
      return h.response(cafe).code(200);
    },
  },
  create: {
    handler: async function (request, h) {
      const payload = request.payload;
      await db.cafeStore.addCafe({
        name: payload.name,
        category: payload.category,
        description: payload.description || "",
        analytics: payload.analytics,
        userId: payload.userId,
      });
      const cafes = await db.cafeStore.getAllCafes();
      const created = cafes.find((c) => c.name === payload.name && c.category === payload.category);
      return h.response(created).code(201);
    },
  },
  update: {
    handler: async function (request, h) {
      const { id } = request.params;
      const payload = request.payload;
      const existing = await db.cafeStore.getCafeById(id);
      if (!existing) return h.response({ error: "Not found" }).code(404);
      await db.cafeStore.updateCafe(id, payload);
      const updated = await db.cafeStore.getCafeById(id);
      return h.response(updated).code(200);
    },
  },
  remove: {
    handler: async function (request, h) {
      const { id } = request.params;
      const existing = await db.cafeStore.getCafeById(id);
      if (!existing) return h.response({ error: "Not found" }).code(404);
      await db.cafeStore.deleteCafe(id);
      return h.response().code(204);
    },
  },
  getByCategory: {
    handler: async function (request, h) {
      const { category } = request.params;
      const cafes = await db.cafeStore.getByCategory(category);
      return h.response(cafes).code(200);
    },
  },
};
