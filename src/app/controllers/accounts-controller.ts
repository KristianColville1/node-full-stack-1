import Joi from "joi";
import { db } from "@/core/data/db.js";
import { UserCredentialsSpec, UserSpec } from "@/app/data/schema/joi-schemas.js";

/** Accounts controller: main, signup, login, logout. */
export const accountsController = {
  /** GET / — Welcome (main) view. */
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Beanmap" });
    },
  },
  /** GET /signup — Show signup form. */
  showSignup: {
    auth: false,
    handler: function (_request, h) {
      return h.view("signup-view", { title: "Sign up for Beanmap", active: "signup", user: null });
    },
  },
  /** POST /signup — Create user, redirect /. */
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = Joi.attempt(request.payload, UserSpec);
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  /** GET /login — Show login form. */
  showLogin: {
    auth: false,
    handler: function (_request, h) {
      return h.view("login-view", { title: "Login to Beanmap", active: "login", user: null });
    },
  },
  /** POST /login — Authenticate; on success set session and redirect /dashboard. */
  login: {
    auth: { mode: "try" },
    handler: async function (request, h) {
      const { email, password } = Joi.attempt(request.payload, UserCredentialsSpec);
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/login");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  /** GET /logout — Clear session, redirect /. */
  logout: {
    auth: { mode: "try" },
    handler: function (request, h) {
      if (request.cookieAuth) {
        request.cookieAuth.clear();
      }
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
