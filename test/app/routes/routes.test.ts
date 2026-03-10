import { suite, test } from "mocha";
import { assert } from "chai";
import { routes } from "@/app/routes/routes.js";

suite("Routes", () => {
  test("routes array has entries", () => {
    assert.isArray(routes);
    assert.isAtLeast(routes.length, 1);
  });

  test("each route has a method, path, and handler", () => {
    routes.forEach((route) => {
      assert.property(route, "method");
      assert.property(route, "path");
      assert.property(route, "handler");
      assert.isFunction(route.handler);
    });
  });

  test("GET / is registered", () => {
    const home = routes.find((r) => r.method === "GET" && r.path === "/");
    assert.exists(home);
    assert.isFunction(home?.handler);
  });

  test("All frontend routes are registered", () => {
    const getSignup = routes.find((r) => r.method === "GET" && r.path === "/signup");
    const postSignup = routes.find((r) => r.method === "POST" && r.path === "/signup");
    const getLogin = routes.find((r) => r.method === "GET" && r.path === "/login");
    const postLogin = routes.find((r) => r.method === "POST" && r.path === "/login");
    assert.exists(getSignup);
    assert.exists(postSignup);
    assert.exists(getLogin);
    assert.exists(postLogin);
  });
});
