export type TranscriptKind =
  | "Technical Concept"
  | "Course Guidance"
  | "General Notes";

export type ArticleMetadata = {
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: TranscriptKind;
  tags: string[];
};

function cleanTranscript(transcript: string) {
  return transcript.replace(/\s+/g, " ").trim();
}

export function guessTranscriptKind(transcript: string): TranscriptKind {
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

export function generateMetadata(transcript: string): ArticleMetadata {
  const text = transcript.toLowerCase();
  const kind = guessTranscriptKind(transcript);

  const tags: string[] = [];

  if (text.includes("react")) tags.push("react");
  if (text.includes("typescript")) tags.push("typescript");
  if (text.includes("fastapi")) tags.push("fastapi");
  if (text.includes("python")) tags.push("python");

  if (kind === "Course Guidance") {
    tags.push("learning-strategy", "course-notes", "study-plan");
  }

  if (text.includes("code along")) tags.push("code-along");
  if (text.includes("project")) tags.push("projects");

  let title = "Untitled Article";

  if (kind === "Course Guidance" && text.includes("take this course")) {
    title = "How to Take This Course";
  } else if (text.includes("expression")) {
    title = "Understanding Expressions";
  } else if (text.includes("component")) {
    title = "Understanding React Components";
  } else if (text.includes("route")) {
    title = "Understanding FastAPI Routes";
  }

  let category = "General";

  if (text.includes("react")) category = "React";
  else if (text.includes("typescript")) category = "TypeScript";
  else if (text.includes("fastapi")) category = "FastAPI";
  else if (text.includes("python")) category = "Python";
  else if (text.includes("course") || text.includes("learn"))
    category = "Learning";

  return {
    title,
    category,
    difficulty: "Beginner",
    type: kind,
    tags: Array.from(new Set(tags.length > 0 ? tags : ["notes"])),
  };
}

function generateFrontmatter(metadata: ArticleMetadata) {
  return `---
title: ${metadata.title}
category: ${metadata.category}
difficulty: ${metadata.difficulty}
type: ${metadata.type}
tags:
${metadata.tags.map((tag) => `  - ${tag}`).join("\n")}
---`;
}

function generateCourseGuidanceMarkdown(metadata: ArticleMetadata) {
  return `${generateFrontmatter(metadata)}

# ${metadata.title}

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
`;
}

function generateTechnicalMarkdown(
  metadata: ArticleMetadata,
  transcript: string,
) {
  return `${generateFrontmatter(metadata)}

# ${metadata.title}

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

export function generateArticleDraft(
  transcript: string,
  metadata?: ArticleMetadata,
) {
  const cleanedTranscript = cleanTranscript(transcript);

  if (!cleanedTranscript) {
    return "";
  }

  const articleMetadata = metadata ?? generateMetadata(cleanedTranscript);

  if (articleMetadata.type === "Course Guidance") {
    return generateCourseGuidanceMarkdown(articleMetadata);
  }

  return generateTechnicalMarkdown(articleMetadata, cleanedTranscript);
}
