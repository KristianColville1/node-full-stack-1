import { after, before, suite, test } from "mocha";
import { assert } from "chai";
import axios from "axios";
import { server, start } from "../src/server.js";

suite("Server", () => {
  before(async () => {
    await start();
  });

  after(async () => {
    server.stop();
  });

  test("server is running and responds on GET /", async () => {
    const url = `http://127.0.0.1:${server.info.port}/`;
    const res = await axios.get(url);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, "ok");
    assert.include(res.data.message, "running");
  });
});
