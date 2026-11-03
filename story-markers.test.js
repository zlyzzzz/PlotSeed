import test from "node:test";
import assert from "node:assert/strict";
import { storyParagraphs, validateLinks } from "../src/story-markers.js";

test("marker links preserve paragraph indices and exclude skipped or unknown choices", () => {
  const links = validateLinks(
    {
      links: [
        { paragraph: 1, optionIds: ["goal", "goal", "time", "unknown"] },
        { paragraph: 1, optionIds: ["growth"] },
        { paragraph: 8, optionIds: ["goal"] },
      ],
    },
    { goal: "Find a compass", time: null, growth: "Trust others" },
    3,
  );
  assert.deepEqual(links, [{ paragraph: 1, optionIds: ["goal", "growth"] }]);
  assert.deepEqual(
    storyParagraphs("Title\n\nFirst paragraph\n\nSecond paragraph"),
    ["Title", "First paragraph", "Second paragraph"],
  );
});
test("invalid annotations cannot become visible story markup", () => {
  assert.throws(() => validateLinks("not JSON", {}, 1));
  assert.throws(() => validateLinks("{}", {}, 1));
  assert.deepEqual(validateLinks('```json\n{"links":[]}\n```', {}, 1), []);
});
