import "dotenv/config";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { registerMiddleware } from "./core/middleware/register.js";

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
server.route({
  method: "GET",
  path: "/",
  handler: () => ({ status: "ok", message: "Server is running" }),
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
});

/**
 * Start the server
 */
export async function start(): Promise<void> {
  console.log("Server running on %s", server.info.uri);
  await server.start();
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

start();