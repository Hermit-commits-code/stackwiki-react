export function generateArticleDraft(transcript: string) {
  const cleanedTranscript = transcript.replace(/\s+/g, " ").trim();

  if (!cleanedTranscript) {
    return "";
  }

  return `# Untitled Article

## Overview

${cleanedTranscript.slice(0, 400)}${cleanedTranscript.length > 400 ? "..." : ""}

## Key Concepts

- Concept 1
- Concept 2
- Concept 3

## Example

\`\`\`ts
// Add code example here
\`\`\`

## Common Mistakes

- Mistake 1
- Mistake 2

## Key Takeaways

- Takeaway 1
- Takeaway 2
- Takeaway 3
`;
}
