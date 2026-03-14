import Joi from "joi";
import { db } from "@/core/data/db.js";
import { UserCredentialsSpec, UserSpec } from "@/app/data/schema/joi-schemas.js";

/** Accounts controller: main, signup, login, logout. */
export const accountsController = {
  /** GET / — Welcome (main) view. */
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Beanmap" });
    },
  },
  /** GET /signup — Show signup form. */
  showSignup: {
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Beanmap" });
    },
  },
  /** POST /signup — Create user, redirect /. */
  signup: {
    handler: async function (request, h) {
      const user = Joi.attempt(request.payload, UserSpec);
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  /** GET /login — Show login form. */
  showLogin: {
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Beanmap" });
    },
  },
  /** POST /login — Authenticate; on success redirect /dashboard. */
  login: {
    handler: async function (request, h) {
      const { email, password } = Joi.attempt(request.payload, UserCredentialsSpec);
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/dashboard");
    },
  },
  /** GET /logout — Clear session, redirect /. */
  logout: {
    handler: function (request, h) {
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
