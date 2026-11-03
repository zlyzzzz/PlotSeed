import test from "node:test";
import assert from "node:assert/strict";
import {
  choiceCounts,
  createPlanningClock,
  formatDuration,
  taskRecord,
} from "../src/metrics.js";
import { createDraft } from "../src/questions.js";

test("timing excludes hidden intervals and flushes exactly once", () => {
  let time = 0,
    total = 0;
  const clock = createPlanningClock(
    (ms) => (total += ms),
    () => time,
    true,
  );
  time = 2400;
  clock.flush(false);
  assert.equal(total, 2400);
  time = 20000;
  clock.flush(true);
  assert.equal(total, 2400);
  time = 21500;
  clock.flush();
  assert.equal(total, 3900);
  clock.flush(false);
  assert.equal(total, 3900);
  time = 23000;
  clock.flush(false);
  assert.equal(total, 3900);
});
test("choice counts separate delegation from actual selections and unanswered slots", () => {
  assert.deepEqual(choiceCounts({ goal: "Find an item", time: null }), {
    selected: 1,
    skipped: 1,
    completed: 2,
  });
  assert.equal(formatDuration(125999), "02:05");
  assert.equal(formatDuration(undefined), "00:00");
});
test("task exports preserve observations and mark historical timing unavailable", () => {
  const draft = createDraft("park");
  draft.activeMs = 1250;
  draft.firstReviewMs = 1000;
  draft.answers = { goal: null };
  draft.shown = { goal: ["a", "b", "c"] };
  const record = taskRecord(draft);
  assert.equal(record.activePlanningMs, 1250);
  assert.equal(record.initialPlanningMs, 1000);
  assert.equal(record.counts.skipped, 1);
  assert.equal(record.timingAvailable, true);
  assert.deepEqual(record.displayedOptions.goal, ["a", "b", "c"]);
  delete draft.startedAt;
  assert.equal(taskRecord(draft).timingAvailable, false);
});
