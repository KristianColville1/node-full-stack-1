export const aboutController = {
  index: {
    handler: async function (_request, h) {
      return h.view("about-view", { title: "About", active: "about" });
    },
  },
};
