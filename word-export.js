import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { scenarios, questionsFor } from "./questions.js";
import { choiceCounts, formatDuration } from "./metrics.js";

function paragraph(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({ text: String(text) })],
    spacing: { after: 120 },
    ...options,
  });
}
function heading(text, level = HeadingLevel.HEADING_1, options = {}) {
  return paragraph(text, {
    heading: level,
    keepNext: true,
    spacing: { before: 220, after: 130 },
    ...options,
  });
}

export function buildWordDocument(records) {
  if (!Array.isArray(records) || records.length === 0)
    throw new Error("No saved stories to export.");
  const children = [
    paragraph(
      records.length > 1 ? "My PlotSeed Stories" : "My PlotSeed Story",
      { heading: HeadingLevel.TITLE },
    ),
    paragraph("Your story, choices and planning summary."),
  ];
  records.forEach((record, index) => {
    const setting =
      scenarios.find((s) => s.id === record.scenario)?.name || "Story";
    const counts = choiceCounts(record.answers);
    children.push(
      heading(
        `${records.length > 1 ? `${index + 1}  ` : ""}${setting}`,
        HeadingLevel.HEADING_1,
        { pageBreakBefore: index > 0 },
      ),
    );
    children.push(
      paragraph(
        `Writing mode: ${record.mode === "free" ? "Free writing" : "Guided choices"}`,
      ),
    );
    if (record.startedAt && Number.isFinite(Date.parse(record.startedAt)))
      children.push(
        paragraph(
          `Started: ${new Date(record.startedAt)
            .toISOString()
            .replace("T", " ")
            .replace(/\.\d+Z$/, " UTC")}`,
        ),
      );
    children.push(
      paragraph(
        `Planning time: ${formatDuration(record.activeMs)} (minutes:seconds)`,
      ),
    );
    if (record.mode === "guided")
      children.push(
        paragraph(
          `${counts.selected} details selected · ${counts.skipped} left to AI · ${counts.completed} of 20 steps completed`,
        ),
      );
    children.push(
      paragraph(
        record.startedAt
          ? "Planning time includes visible question and writing pages. Hidden tabs, review, reading and AI waiting time are excluded."
          : "This draft began before timing was available. The recorded time may be incomplete.",
        { spacing: { after: 230 } },
      ),
    );
    if (record.story) {
      children.push(heading("Your story"));
      const blocks = record.story
        .split(/\n\s*\n/)
        .map((x) => x.trim())
        .filter(Boolean);
      for (const block of blocks)
        children.push(paragraph(block, { spacing: { after: 180, line: 310 } }));
    } else
      children.push(
        paragraph(
          "Story status: Not generated yet. Your saved brief is included below.",
        ),
      );
    children.push(heading("Your story brief"));
    if (record.mode === "free")
      children.push(paragraph(record.prompt || "No instructions written yet."));
    else
      questionsFor(record.scenario).forEach((q, i) => {
        children.push(
          heading(`${i + 1}  ${q.question}`, HeadingLevel.HEADING_2),
        );
        const answer = record.answers?.[q.id];
        children.push(
          paragraph(
            answer === null
              ? "Let AI decide"
              : typeof answer === "string"
                ? answer
                : "Not answered yet",
          ),
        );
      });
  });
  return new Document({
    title: "PlotSeed Story Record",
    creator: "PlotSeed",
    description: "Readable story and planning record exported from PlotSeed.",
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 22, color: "000000" },
          paragraph: { spacing: { line: 290 } },
        },
      },
      paragraphStyles: [
        {
          id: "Title",
          name: "Title",
          basedOn: "Normal",
          next: "Normal",
          run: { font: "Arial", size: 42, bold: true, color: "000000" },
          paragraph: { spacing: { after: 200 } },
        },
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: "Arial", size: 29, bold: true, color: "000000" },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: "Arial", size: 23, bold: true, color: "000000" },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1134, bottom: 1134, left: 1276, right: 1276 },
          },
        },
        children,
      },
    ],
  });
}

export const exportWordBlob = (records) =>
  Packer.toBlob(buildWordDocument(records));
export const exportWordBuffer = (records) =>
  Packer.toBuffer(buildWordDocument(records));
