import { db } from "@/core/data/db.js";

export const cafeController = {
  index: {
    handler: async function (request, h) {
      const cafes = await db.cafeStore.getAllCafes();
      return h.view("cafe-view", { title: "Cafes", cafes, active: "cafes" });
    },
  },
};
