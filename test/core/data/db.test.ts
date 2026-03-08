import { suite, test } from "mocha";
import { assert } from "chai";
import { DataSource } from "typeorm";
import { db } from "../../../src/core/data/db.js";

suite("Core - db", () => {
  test("db module exports an object", () => {
    assert.isObject(db);
  });

  test("db has a dataSource", () => {
    assert.property(db, "dataSource");
    assert.instanceOf(db.dataSource, DataSource);
  });

  test("db.dataSource has expected config", () => {
    const opts = db.dataSource.options;
    assert.strictEqual(opts.type, "sqlite");
    assert.strictEqual(opts.database, ":memory:");
    assert.isArray(opts.entities);
    assert.lengthOf(opts.entities, 0);
  });

  test("db has an initialiser", () => {
    assert.property(db, "init");
    assert.isFunction(db.init);
  });

  test("db.init() resolves without error", async () => {
    await db.init();
  });

  test("db.init() initializes dataSource", async () => {
    await db.init();
    assert.isTrue(db.dataSource.isInitialized);
  });

  test("db.init() is idempotent (second call does not throw)", async () => {
    await db.init();
    await db.init();
    assert.isTrue(db.dataSource.isInitialized);
  });
});
