import { suite, test } from "mocha";
import { assert } from "chai";
import { db } from "../../../src/core/data/db.js";

suite("Core - db", () => {
  test("db module exports an object", () => {
    assert.isObject(db);
  });

  test("db has an initialiser", () => {
    assert.property(db, "init");
    assert.isFunction(db.init);
  });

  test("db.init() resolves without error", async () => {
    await db.init();
  });
});
