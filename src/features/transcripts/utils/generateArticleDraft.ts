type TranscriptKind = "Technical Concept" | "Course Guidance" | "General Notes";

function cleanTranscript(transcript: string) {
  return transcript.replace(/\s+/g, " ").trim();
}

function guessTranscriptKind(transcript: string): TranscriptKind {
  const text = transcript.toLowerCase();

  if (
    text.includes("take this course") ||
    text.includes("get the most out of it") ||
    text.includes("code along") ||
    text.includes("watch the videos") ||
    text.includes("skill level")
  ) {
    return "Course Guidance";
  }

  if (
    text.includes("component") ||
    text.includes("props") ||
    text.includes("state") ||
    text.includes("route") ||
    text.includes("api") ||
    text.includes("operator") ||
    text.includes("expression")
  ) {
    return "Technical Concept";
  }

  return "General Notes";
}

function guessTitle(transcript: string, kind: TranscriptKind) {
  const text = transcript.toLowerCase();

  if (kind === "Course Guidance") {
    if (text.includes("take this course")) return "How to Take This Course";
    return "Course Learning Strategy";
  }

  if (text.includes("expression")) return "Understanding Expressions";
  if (text.includes("component")) return "Understanding React Components";
  if (text.includes("route")) return "Understanding FastAPI Routes";

  return "Untitled Article";
}

function guessCategory(transcript: string) {
  const text = transcript.toLowerCase();

  if (text.includes("react")) return "React";
  if (text.includes("typescript")) return "TypeScript";
  if (text.includes("fastapi")) return "FastAPI";
  if (text.includes("python")) return "Python";
  if (text.includes("course") || text.includes("learn")) return "Learning";

  return "General";
}

function guessTags(transcript: string, kind: TranscriptKind) {
  const text = transcript.toLowerCase();
  const tags: string[] = [];

  if (text.includes("react")) tags.push("react");
  if (text.includes("typescript")) tags.push("typescript");
  if (text.includes("fastapi")) tags.push("fastapi");
  if (text.includes("python")) tags.push("python");

  if (kind === "Course Guidance") {
    tags.push("learning-strategy", "course-notes", "study-plan");
  }

  if (text.includes("expression")) tags.push("expressions");
  if (text.includes("operator")) tags.push("operators");
  if (text.includes("component")) tags.push("components");
  if (text.includes("route")) tags.push("routes");
  if (text.includes("code along")) tags.push("code-along");
  if (text.includes("project")) tags.push("projects");

  return Array.from(new Set(tags.length > 0 ? tags : ["notes"]));
}

function generateCourseGuidanceMarkdown(
  transcript: string,
  title: string,
  category: string,
  tags: string[],
) {
  return `---
title: ${title}
category: ${category}
difficulty: Beginner
type: Course Guidance
tags:
${tags.map((tag) => `  - ${tag}`).join("\n")}
---

# ${title}

## Overview

This lesson explains how to get the most value from the course. The main idea is that watching alone can help, but coding along and building your own projects will help you retain the material much better.

## Recommended Ways to Take the Course

### 1. Just Watch

This approach means watching the videos without coding along.

This can still be useful if you are reviewing material, listening while walking, or trying to get a high-level overview.

However, watching alone is usually not enough to build real skill.

### 2. Code Along

This is the recommended minimum approach.

You watch the lessons and type the code as the instructor builds projects and explains concepts.

This helps because you are not only seeing the code, you are also practicing the workflow and thinking through why each step matters.

### 3. Watch, Code, and Practice

This is the strongest learning method.

You watch the lesson, code along with the instructor, and then either extend the project or build a small related project on your own.

This takes more time, but it gives you real-world practice and helps you stop relying only on tutorials.

## Skill Level

This course is designed for both beginners and intermediate React developers.

Beginners should follow the course from the beginning and focus on the fundamentals.

Intermediate learners can skip familiar sections and focus on newer tools, project patterns, React Router, TanStack Query, and more advanced workflows.

## How to Get Help

Before asking for help, try to solve the issue yourself.

Recommended troubleshooting steps:

- Check the browser console for errors.
- Read the error message carefully.
- Look at the line number mentioned in the error.
- Search the documentation.
- Use AI tools to explain errors and concepts.
- Ask for help only after making a real attempt.

## Personal Study Rule

For this course, the best path is:

1. Watch the lesson.
2. Code along.
3. Commit your work.
4. Write a StackWiki note.
5. Build or extend a small project using the concept.

## Key Takeaways

- Watching is useful, but coding builds skill.
- Coding along helps reinforce what you learn.
- Building your own related projects creates real experience.
- Debugging errors is part of becoming a developer.
- StackWiki should turn each lesson into a reusable learning note.

## Source Transcript Notes

${transcript}
`;
}

function generateTechnicalMarkdown(
  transcript: string,
  title: string,
  category: string,
  tags: string[],
) {
  return `---
title: ${title}
category: ${category}
difficulty: Beginner
type: Technical Concept
tags:
${tags.map((tag) => `  - ${tag}`).join("\n")}
---

# ${title}

## Overview

${transcript.slice(0, 450)}${transcript.length > 450 ? "..." : ""}

## Definition

Explain the main concept in plain language.

## Why It Matters

Explain where this concept appears in real projects and why developers need to understand it.

## How It Works

Break the topic into smaller pieces.

## Example

\`\`\`ts
// Add code example here
\`\`\`

## Common Mistakes

- Skipping the vocabulary.
- Copying code without understanding it.
- Not practicing with a small example.

## Key Takeaways

- Define the concept in your own words.
- Build a small example.
- Review this note before moving on.
`;
}

export function generateArticleDraft(transcript: string) {
  const cleanedTranscript = cleanTranscript(transcript);

  if (!cleanedTranscript) {
    return "";
  }

  const kind = guessTranscriptKind(cleanedTranscript);
  const title = guessTitle(cleanedTranscript, kind);
  const category = guessCategory(cleanedTranscript);
  const tags = guessTags(cleanedTranscript, kind);

  if (kind === "Course Guidance") {
    return generateCourseGuidanceMarkdown(
      cleanedTranscript,
      title,
      category,
      tags,
    );
  }

  return generateTechnicalMarkdown(cleanedTranscript, title, category, tags);
}
