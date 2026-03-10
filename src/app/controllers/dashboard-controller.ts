export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const viewData = { title: "Dashboard" };
      return h.view("dashboard-view", viewData);
    },
  },
};
