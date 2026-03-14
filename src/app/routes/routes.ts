import { dashboardController } from "@/app/controllers/dashboard-controller.js";
import { accountsController } from "@/app/controllers/accounts-controller.js";
import { cafeController } from "@/app/controllers/cafe-controller.js";

/**
 * Routes for the frontend of the application.
 */
export const routes = [
  { method: "GET", path: "/", handler: dashboardController.index.handler },
  { method: "GET", path: "/dashboard", handler: dashboardController.index.handler },
  { method: "GET", path: "/cafes", handler: cafeController.index.handler },
  /** GET /signup — Signup form. POST /signup — Create account. */
  { method: "GET", path: "/signup", handler: accountsController.showSignup.handler },
  { method: "POST", path: "/signup", handler: accountsController.signup.handler },
  /** GET /login — Login form. POST /login — Authenticate → /dashboard. */
  { method: "GET", path: "/login", handler: accountsController.showLogin.handler },
  { method: "POST", path: "/login", handler: accountsController.login.handler },
  /** GET /logout — Sign out, redirect /. */
  { method: "GET", path: "/logout", handler: accountsController.logout.handler },
];