import { db } from "@/core/data/db.js";
import { CafeSpec } from "@/app/data/schema/joi-schemas.js";

export const cafeController = {
  index: {
    handler: async function (request, h) {
      const cafes = await db.cafeStore.getAllCafes();
      return h.view("cafe-view", { title: "Cafes", cafes, active: "cafes" });
    },
  },

  addCafe: {
    validate: {
      payload: CafeSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const cafes = await db.cafeStore.getAllCafes();
        return h
          .view("dashboard-view", {
            title: "Add cafe error",
            active: "dashboard",
            cafes,
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const newCafe = {
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description || "",
      };
      await db.cafeStore.addCafe(newCafe);
      return h.redirect("/dashboard");
    },
  },

  deleteCafe: {
    handler: async function (request, h) {
      const { id } = request.params;
      const cafe = await db.cafeStore.getCafeById(id);
      if (!cafe) {
        return h.redirect("/cafes");
      }
      await db.cafeStore.deleteCafe(id);
      return h.redirect("/cafes");
    },
  },
};
