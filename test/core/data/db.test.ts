import { suite, test } from "mocha";
import { assert } from "chai";
import { db, initStores } from "@/core/data/db.js";

suite("Core - db", () => {
  test("db module exports an object", () => {
    assert.isObject(db);
  });

  test("db has userStore", () => {
    assert.property(db, "userStore");
  });

  test("initStores() assigns memory store by default", () => {
    initStores("memory");
    assert.exists(db.userStore);
    assert.isFunction(db.userStore.addUser);
    assert.isFunction(db.userStore.getUserByEmail);
  });

  test("userStore.addUser and getUserByEmail work", async () => {
    initStores("memory");
    await db.userStore.addUser({ email: "a@b.com", password: "secret" });
    const user = await db.userStore.getUserByEmail("a@b.com");
    assert.exists(user);
    assert.strictEqual(user?.email, "a@b.com");
    assert.strictEqual(user?.password, "secret");
  });

  test("initStores('json') throws (not yet implemented)", () => {
    assert.throws(() => initStores("json"), "not yet implemented");
  });
});
