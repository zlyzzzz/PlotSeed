export const scenarios = [
  {
    id: "park",
    name: "Amusement Park",
    number: "01",
    symbol: "✷",
    description: "Bright lights, chance encounters, and one unexpected turn.",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    number: "02",
    symbol: "◒",
    description: "Shared tables, small secrets, and things left unsaid.",
  },
  {
    id: "classroom",
    name: "Classroom",
    number: "03",
    symbol: "▧",
    description: "Small discoveries and big decisions, within four walls.",
  },
];
// Stable slot ids are shared by the UI, saved records and backend validation.
const rows = [
  [
    "protagonist",
    "Your main character",
    "Who is at the heart of your story?",
    [
      "A university student visiting for the first time",
      "A staff member who knows the place well",
      "A young person waiting for a friend",
      "A newcomer joining an activity",
      "A volunteer helping things run smoothly",
      "An amateur photographer recording the day",
      "A visitor accompanying a family member",
      "A regular visitor preparing to leave",
    ],
  ],
  [
    "personality",
    "A defining trait",
    "What is your main character like?",
    [
      "Curious and eager to explore",
      "Cautious and observant",
      "Helpful, often putting others first",
      "Shy and hesitant to approach strangers",
      "Impulsive, acting before thinking",
      "Determined and reluctant to give up",
      "Optimistic, with a sense of humor",
      "Unsure of themselves and their judgment",
    ],
  ],
  [
    "goal",
    "Something to pursue",
    "What does your character want to achieve?",
    [
      "Recover a personally important item",
      "Keep a promise made to someone",
      "Complete a task before a deadline",
      "Clear up an unfair misunderstanding",
      "Help someone who is struggling",
      "Say something they have kept to themselves",
      "Repair a relationship that has grown distant",
      "Find the cause of something unusual",
    ],
  ],
  [
    "motivation",
    "A reason to care",
    "Why does this matter to your character?",
    [
      "Someone important is counting on them",
      "They do not want to repeat an old regret",
      "They want to prove they can handle things independently",
      "It is connected to a precious memory",
      "They feel responsible for the situation",
      "It is an opportunity they have waited for",
      "They want to prevent trouble for other people",
      "They want to change how others see them",
    ],
  ],
  [
    "supporting",
    "Someone who matters",
    "Who will influence your character’s actions?",
    [
      "A friend they have known for years",
      "A stranger they have just met",
      "Someone with more experience",
      "A peer working toward a goal of their own",
      "A younger person who needs help",
      "A serious-looking but observant person",
      "Someone with a very different approach",
      "Someone who knows more than they have said",
    ],
  ],
  [
    "relationship",
    "A connection",
    "What is the relationship between them?",
    [
      "They trust each other and speak openly",
      "They have only just met",
      "An earlier misunderstanding has made them distant",
      "They are competing for the same opportunity",
      "One has helped the other before",
      "They appear friendly but disagree beneath the surface",
      "They have never interacted much, but now need to cooperate",
      "They admire each other but hesitate to reach out",
    ],
  ],
  [
    "time",
    "The right moment",
    "When does your story take place?",
    [
      "Early morning, as people begin to arrive",
      "In the morning, as the day gets underway",
      "At midday, with people coming and going",
      "In the afternoon, as the pace begins to change",
      "At dusk, as the daylight slowly fades",
      "Shortly before an important activity begins",
      "Halfway through an important activity",
      "As the day’s activities are about to end",
    ],
  ],
  ["location", "A place to begin", "Where does the first scene unfold?", []],
  [
    "opening",
    "Before things change",
    "What is happening at the beginning?",
    [
      "Everything seems perfectly ordinary",
      "The character is following a careful plan",
      "The character is waiting for someone",
      "Everyone is busy and nobody notices the character",
      "The character has just finished a small task and relaxed",
      "People are preparing for an activity",
      "There is an awkward silence between the two characters",
      "Something feels wrong, but the character cannot explain why",
    ],
  ],
  [
    "incident",
    "The unexpected",
    "What disrupts the situation?",
    [
      "An important item goes missing",
      "An unexpected message arrives",
      "Someone makes a difficult request",
      "A previously agreed arrangement suddenly changes",
      "The character overhears a conversation involving them",
      "A small mistake sets off a chain of events",
      "The other character does something surprising",
      "The situation does not match the information they received",
    ],
  ],
  [
    "conflict",
    "The central problem",
    "What problem must your character face?",
    [
      "Their goal conflicts with someone else’s needs",
      "Someone misunderstands their intentions",
      "They must choose between honesty and avoiding embarrassment",
      "The two characters disagree about how to solve the problem",
      "They must do something outside their abilities",
      "They must face an issue they have been avoiding",
      "An apparently reasonable arrangement is unfair to someone",
      "They want to solve things alone but need someone else",
    ],
  ],
  [
    "obstacle",
    "Something in the way",
    "What makes the goal difficult to reach?",
    [
      "There is very little time left",
      "A crucial clue is incomplete",
      "Someone who could help cannot be reached",
      "The usual route is temporarily blocked",
      "An item needed for the next step is unavailable",
      "The other character doubts their judgment",
      "A noisy environment keeps disrupting communication",
      "Fear of failure makes it difficult to act",
    ],
  ],
  [
    "stakes",
    "What is at stake",
    "What could happen if your character fails?",
    [
      "A rare opportunity could be lost",
      "An important relationship could grow more distant",
      "Someone could lose trust in their promises",
      "Someone might leave with the wrong impression",
      "Earlier effort might not achieve its intended result",
      "A problem affecting one person could spread to others",
      "They could be left regretting their inaction again",
      "A meaningful moment could be spoiled",
    ],
  ],
  [
    "action",
    "A first attempt",
    "What does your character do first?",
    [
      "Retrace their steps alone to look for clues",
      "Ask the person most likely to know what happened",
      "Ask the other character to work with them",
      "Observe the surroundings and check what they know",
      "Immediately try their most familiar approach",
      "Explain their intentions to clear up confusion",
      "Break the problem into smaller tasks",
      "Help the person affected before continuing their own plan",
    ],
  ],
  [
    "result",
    "A ripple effect",
    "What happens after the first attempt?",
    [
      "They find a useful but incomplete clue",
      "A small problem is solved, revealing a larger one",
      "The attempt fails, but they discover why",
      "The other character understands and offers help",
      "Their action is misinterpreted and tension increases",
      "They make progress but use more time than expected",
      "They realize their earlier judgment was wrong",
      "Someone previously overlooked becomes involved",
    ],
  ],
  [
    "resource",
    "A little help",
    "What new help or information becomes available?",
    [
      "A written record that was overlooked",
      "Someone who witnessed a key event",
      "A useful skill the other character possesses",
      "A new use for an ordinary object",
      "A memory that changes their understanding",
      "An alternative approach they had not considered",
      "Someone willing to help for a short time",
      "An important detail everyone else missed",
    ],
  ],
  [
    "twist",
    "A different perspective",
    "What changes the direction of the story?",
    [
      "The other character is under similar pressure",
      "The apparent troublemaker was trying to help",
      "The original problem began with a communication error",
      "The character realizes something else matters more",
      "An apparently useless clue becomes essential",
      "A quiet person reveals the missing information",
      "The character realizes their own actions contributed",
      "Someone on the opposing side suggests a shared solution",
    ],
  ],
  [
    "decision",
    "The turning point",
    "What does your character decide at the crucial moment?",
    [
      "Honestly admit a mistake",
      "Set aside their preferred method and try a suggestion",
      "Speak honestly despite feeling nervous",
      "Give up a personal opportunity to help someone",
      "Ask for cooperation rather than carry everything alone",
      "Accept a trade-off and choose what matters most",
      "Insist on clarifying the truth despite the awkwardness",
      "Act with the resources available instead of waiting",
    ],
  ],
  [
    "ending",
    "How things settle",
    "How is the central problem resolved?",
    [
      "The goal is achieved and a relationship is repaired",
      "The goal is partly achieved, but the main conflict is resolved",
      "The original goal is missed, but something more important is understood",
      "The characters find a solution both can accept",
      "The misunderstanding is cleared up and they begin again",
      "The problem is solved in a surprising but plausible way",
      "The character pays a price but fulfills their promise",
      "The immediate issue settles and the next step becomes clear",
    ],
  ],
  [
    "growth",
    "What remains",
    "How has your character changed?",
    [
      "They become more willing to ask for help",
      "They begin to trust their own abilities",
      "They learn to listen before reaching conclusions",
      "They understand that admitting mistakes is not failure",
      "They value relationships as well as outcomes",
      "They accept imperfect results and keep going",
      "They become more willing to express their feelings",
      "They learn to respect a different way of doing things",
    ],
  ],
];
const places = {
  park: [
    "Beside the entrance gates",
    "In the queue for a popular ride",
    "Inside the souvenir shop",
    "In the plaza near the Ferris wheel",
    "Beside a park map",
    "Near a food stall",
    "Outside the visitor service center",
    "In a quiet rest area",
  ],
  restaurant: [
    "Beside the restaurant entrance",
    "At a table by the window",
    "At the ordering counter",
    "In the waiting area",
    "Beside the passage to the kitchen",
    "At the self-service station",
    "Beside a table that has not been cleared",
    "In a corner prepared for a special event",
  ],
  classroom: [
    "At the classroom doorway",
    "In a row of seats by the window",
    "Near the teacher’s desk",
    "At the back of the classroom",
    "In a group discussion area",
    "Beside the storage cabinets",
    "In front of a noticeboard displaying assignments",
    "In the corner where teaching materials are stored",
  ],
};
export function questionsFor(scenario) {
  return rows.map(([id, label, question, options]) => ({
    id,
    label,
    question,
    options: id === "location" ? places[scenario] : options,
  }));
}
// Only relationship combinations with explicit rules are filtered here.
export function candidates(question, answers) {
  if (question.id === "relationship" && answers.supporting === rows[4][3][1])
    return question.options.filter((_, i) => [1, 3, 6, 7].includes(i));
  if (question.id === "relationship" && answers.supporting === rows[4][3][0])
    return question.options.filter((_, i) => ![1, 6].includes(i));
  return question.options;
}
export function drawThree(pool, random = Math.random) {
  const copy = [...new Set(pool)];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}
export function createDraft(scenario) {
  return {
    version: 2,
    id: crypto.randomUUID(),
    scenario,
    step: 0,
    answers: {},
    shown: {},
    story: "",
    mode: "guided",
    prompt: "",
    startedAt: new Date().toISOString(),
    activeMs: 0,
    firstReviewMs: null,
    batchHistory: {},
    refreshCounts: {},
    skipNoticeShown: false,
  };
}
export function setAnswer(draft, id, value) {
  const answers = { ...draft.answers, [id]: value };
  const shown = { ...draft.shown };
  if (id === "supporting" && draft.answers[id] !== value) {
    delete answers.relationship;
    delete shown.relationship;
  }
  return { ...draft, answers, shown, story: "" };
}
