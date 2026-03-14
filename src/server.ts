import "dotenv/config";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import jwt from "hapi-auth-jwt2";
import Joi from "joi";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { registerMiddleware } from "@/core/middleware/register.js";
import { initStores } from "@/core/data/db.js";
import { routes as frontendRoutes } from "@/app/routes/routes.js";
import { apiRoutes } from "@/app/api/api-routes.js";
import { accountsController } from "./app/controllers/accounts-controller";
import { validateJWT } from "./app/api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the environment variables
 */
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

/**
 * Set the host and port
 */
const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ?? 3000;


/**
 * Create the server
 */
export const server = Hapi.server({
  host,
  port: Number(port),
});

/**
 * Register the middleware
 */
await registerMiddleware(server);

/**
 * Register the validator
 */
server.validator(Joi);
  
/**
 * Register the routes
 */
server.route(frontendRoutes as any);
server.route(apiRoutes as any);

/**
 * Static assets (public folder). Served at /assets.
 */
server.route({
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: path.join(__dirname, "..", "public"),
      redirectToSlash: true,
      index: false,
    },
  },
});

/**
 * Register the views
 */
server.views({
  engines: {
    hbs: Handlebars,
  },
  relativeTo: __dirname,
  path: "./app/views",
  layoutPath: "./app/views/layouts",
  partialsPath: "./app/views/partials",
  layout: true,
  isCached: false,
  context: {
    currentYear: new Date().getFullYear(),
  },
});

/**
 * Cookie and JWT authentication
 */

server.auth.strategy("session", "cookie", {
  cookie: {
    name: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD,
    isSecure: false
  },
  redirectTo: "/",
  validate: accountsController.validate
});
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validateJWT,
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.auth.default("session");



/**
 * Start the server
 */
export async function start(): Promise<void> {
  initStores();
  console.log("Server running on %s", server.info.uri);
  await server.register(Cookie);
  await server.register(jwt);
  await server.start();
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

start();