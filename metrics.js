export function formatDuration(milliseconds = 0) {
  const seconds = Math.floor(Math.max(0, Number(milliseconds) || 0) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function choiceCounts(answers = {}) {
  const values = Object.values(answers);
  return {
    selected: values.filter((value) => typeof value === "string").length,
    skipped: values.filter((value) => value === null).length,
    completed: values.filter(
      (value) => value === null || typeof value === "string",
    ).length,
  };
}

// Only add time when the previous interval was on a visible planning page.
// A visibility transition flushes the old interval before changing its state.
export function createPlanningClock(
  onElapsed,
  now = () => performance.now(),
  visible = true,
) {
  let last = now();
  return {
    flush(nextVisible = visible) {
      const current = now();
      const elapsed = Math.max(0, current - last);
      last = current;
      if (visible && elapsed) onElapsed(elapsed);
      visible = nextVisible;
    },
  };
}

export function taskRecord(draft) {
  return {
    schemaVersion: 1,
    app: "PlotSeed",
    interfaceVersion: "plotseed-2",
    mode: draft.mode,
    scenario: draft.scenario,
    startedAt: draft.startedAt || null,
    timingDefinition:
      "Visible question or free-writing page time only. Excludes home, review, story reading, hidden tabs and generation waiting. Includes time spent thinking on a visible planning page.",
    activePlanningMs: Math.round(draft.activeMs || 0),
    initialPlanningMs:
      draft.firstReviewMs === null || draft.firstReviewMs === undefined
        ? null
        : Math.round(draft.firstReviewMs),
    timingAvailable: Boolean(draft.startedAt),
    counts: draft.mode === "guided" ? choiceCounts(draft.answers) : null,
    displayedOptions: draft.mode === "guided" ? draft.shown : null,
    optionBatchHistory:
      draft.mode === "guided" ? draft.batchHistory || {} : null,
    refreshCounts: draft.mode === "guided" ? draft.refreshCounts || {} : null,
    skipNoticeShown: Boolean(draft.skipNoticeShown),
    skipCountWhenNotified: draft.skipCountWhenNotified ?? null,
    answers: draft.mode === "guided" ? draft.answers : null,
    prompt: draft.mode === "free" ? draft.prompt : null,
    exportedAt: new Date().toISOString(),
  };
}
