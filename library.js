export const LIBRARY_KEY = "plotseed-library-v1";

export function loadLibrary(storage) {
  try {
    const records = JSON.parse(storage.getItem(LIBRARY_KEY) || "[]");
    return Array.isArray(records)
      ? records.filter(
          (d) =>
            d &&
            typeof d.id === "string" &&
            ["park", "restaurant", "classroom"].includes(d.scenario) &&
            ["guided", "free"].includes(d.mode) &&
            d.answers &&
            d.shown,
        )
      : [];
  } catch {
    return [];
  }
}

export function upsertDraft(records, draft) {
  if (!draft?.id) return records;
  return [
    { ...draft, updatedAt: new Date().toISOString() },
    ...records.filter((record) => record.id !== draft.id),
  ];
}

export function draftPage(draft) {
  return draft.story
    ? "story"
    : draft.mode === "free"
      ? "free"
      : draft.step === 20
        ? "review"
        : "questions";
}

export function nextBatch(
  pool,
  current = [],
  selected = null,
  seen = [],
  random = Math.random,
) {
  const unique = [...new Set(pool)];
  const keep =
    typeof selected === "string" && unique.includes(selected) ? [selected] : [];
  const shuffle = (items) => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const fresh = shuffle(
    unique.filter(
      (x) => !keep.includes(x) && !current.includes(x) && !seen.includes(x),
    ),
  );
  const outside = shuffle(
    unique.filter(
      (x) => !keep.includes(x) && !current.includes(x) && !fresh.includes(x),
    ),
  );
  const old = shuffle(
    unique.filter(
      (x) => !keep.includes(x) && !fresh.includes(x) && !outside.includes(x),
    ),
  );
  const result = [...keep, ...fresh, ...outside, ...old].slice(0, 3);
  return shuffle(result);
}

export function moveToTrash(records, id) {
  return records.map((record) =>
    record.id === id
      ? { ...record, deletedAt: new Date().toISOString() }
      : record,
  );
}
export function restoreFromTrash(records, id) {
  return records.map((record) => {
    if (record.id !== id) return record;
    const copy = { ...record };
    delete copy.deletedAt;
    return copy;
  });
}
