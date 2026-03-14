import { db } from "@/core/data/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const cafes = await db.cafeStore.getAllCafes();
      return h.view("dashboard-view", { title: "Dashboard", active: "dashboard", cafes });
    },
  },
};
