import "dotenv/config";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import { registerMiddleware } from "./core/middleware/register.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ?? 3000;

export const server = Hapi.server({
  host,
  port: Number(port),
});

await registerMiddleware(server);
server.validator(Joi);
  
server.route({
  method: "GET",
  path: "/",
  handler: () => ({ status: "ok", message: "Server is running" }),
});

export async function start(): Promise<void> {
  await server.start();

  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

start();