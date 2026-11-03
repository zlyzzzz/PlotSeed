import test from "node:test";
import assert from "node:assert/strict";
import {
  providerConfig,
  generationRequest,
  extractStory,
} from "../server/providers.js";

test("DeepSeek uses its own key, official endpoint and chat message schema", () => {
  const config = providerConfig({
    LLM_PROVIDER: "deepseek",
    DEEPSEEK_API_KEY: "test-only",
    OPENAI_API_KEY: "unused",
  });
  assert.equal(config.key, "test-only");
  assert.equal(config.model, "deepseek-flash");
  const req = generationRequest(config, { setting: "Restaurant" });
  assert.equal(req.url, "https://api.deepseek.com/chat/completions");
  assert.equal(req.body.messages[0].role, "system");
  assert.equal(req.body.messages[1].role, "user");
  assert.equal(req.body.thinking.type, "disabled");
  assert.ok(!("instructions" in req.body));
});
test("only complete visible story content is extracted", () => {
  assert.equal(
    extractStory("deepseek", {
      choices: [
        {
          finish_reason: "stop",
          message: { content: " A story ", reasoning_content: "Hidden" },
        },
      ],
    }),
    "A story",
  );
  assert.equal(
    extractStory("deepseek", {
      choices: [
        { finish_reason: "length", message: { content: "Incomplete" } },
      ],
    }),
    "",
  );
  assert.equal(
    extractStory("openai", {
      status: "completed",
      output: [{ content: [{ type: "output_text", text: "Story" }] }],
    }),
    "Story",
  );
  assert.equal(
    providerConfig({ LLM_PROVIDER: "invalid", DEEPSEEK_API_KEY: "unused" }).key,
    "",
  );
});
