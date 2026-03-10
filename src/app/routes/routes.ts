import { dashboardController } from "@/app/controllers/dashboard-controller.js";
import { accountsController } from "@/app/controllers/accounts-controller.js";

/**
 * Routes for the frontend of the application.
 */
export const routes = [
  { method: "GET", path: "/", handler: dashboardController.index.handler },
  { method: "GET", path: "/signup", handler: accountsController.showSignup.handler },
  { method: "POST", path: "/signup", handler: accountsController.signup.handler },
  { method: "GET", path: "/login", handler: accountsController.showLogin.handler },
  { method: "POST", path: "/login", handler: accountsController.login.handler },
  { method: "GET", path: "/logout", handler: accountsController.logout.handler },
];