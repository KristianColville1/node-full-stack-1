import { db } from "@/core/data/db.js";

export const cafeController = {
  index: {
    handler: async function (request, h) {
      const cafes = await db.cafeStore.getAllCafes();
      return h.view("cafe-view", { title: "Cafes", cafes });
    },
  },
  addCafe: {
    handler: async function (request, h) {
      const { name, category, description, analytics, userId } = request.payload;
      await db.cafeStore.addCafe({
        name,
        category,
        description: description || "",
        analytics,
        userId,
      });
      return h.redirect("/cafes");
    },
  }
};
