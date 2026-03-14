export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const viewData = { title: "Dashboard", active: "dashboard" };
      return h.view("dashboard-view", viewData);
    },
  },
};
