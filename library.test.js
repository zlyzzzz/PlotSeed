import test from "node:test";
import assert from "node:assert/strict";
import {
  loadLibrary,
  upsertDraft,
  draftPage,
  nextBatch,
} from "../src/library.js";
import { createDraft } from "../src/questions.js";

test("local library updates one draft while keeping earlier stories", () => {
  const first = createDraft("park"),
    second = createDraft("classroom");
  let library = upsertDraft([], first);
  library = upsertDraft(library, second);
  library = upsertDraft(library, { ...first, prompt: "Revised" });
  assert.equal(library.length, 2);
  assert.equal(library[0].id, first.id);
  assert.equal(library[0].prompt, "Revised");
  assert.equal(library[1].id, second.id);
  assert.deepEqual(loadLibrary({ getItem: () => "{bad" }), []);
  assert.equal(
    loadLibrary({ getItem: () => JSON.stringify(library) }).length,
    2,
  );
});
test("saved records reopen at their relevant page", () => {
  const d = createDraft("park");
  assert.equal(draftPage(d), "questions");
  assert.equal(draftPage({ ...d, step: 20 }), "review");
  assert.equal(draftPage({ ...d, mode: "free" }), "free");
  assert.equal(draftPage({ ...d, story: "A story" }), "story");
});
test("new batches avoid current options when possible and keep a selected answer", () => {
  const pool = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const next = nextBatch(pool, ["a", "b", "c"], null, ["a", "b", "c"]);
  assert.equal(new Set(next).size, 3);
  assert.ok(next.every((x) => !["a", "b", "c"].includes(x)));
  const pinned = nextBatch(pool, ["a", "b", "c"], "b");
  assert.ok(pinned.includes("b"));
  assert.equal(new Set(pinned).size, 3);
  const small = nextBatch(["a", "b", "c", "d"], ["a", "b", "c"], null);
  assert.ok(small.includes("d"));
  assert.equal(new Set(small).size, 3);
});
