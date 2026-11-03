import { questionsFor } from "./questions.js";

export function beginReviewEdit(draft, index) {
  return {
    ...draft,
    step: index,
    returnToReview: true,
    reviewAnchor: questionsFor(draft.scenario)[index]?.id || null,
  };
}

export function finishReviewEdit(draft) {
  return { ...draft, step: 20, returnToReview: false };
}

export function missingQuestionIds(draft) {
  return questionsFor(draft.scenario)
    .filter((q) => !(q.id in draft.answers))
    .map((q) => q.id);
}
