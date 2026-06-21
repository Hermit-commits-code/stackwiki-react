export type Article = {
  id: number;
  title: string;
  category: string;
  slug: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  tags: string[];
  content: string;
};

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "React Components",
    category: "React",
    slug: "react-components",
    difficulty: "Beginner",
    description: "Learn how components are the building blocks of React apps.",
    tags: ["react", "components", "frontend"],
    content:
      "Components are reusable pieces of UI. In React, components let you split your interface into smaller, maintainable parts.",
  },
  {
    id: 2,
    title: "TypeScript Props",
    category: "TypeScript",
    slug: "typescript-props",
    difficulty: "Beginner",
    description: "Understand how to type React component props safely.",
    tags: ["typescript", "props", "types"],
    content:
      "Props are inputs passed into React components. TypeScript helps make those inputs predictable and safer.",
  },
  {
    id: 3,
    title: "FastAPI Routes",
    category: "FastAPI",
    slug: "fastapi-routes",
    difficulty: "Beginner",
    description: "Create clean API endpoints using Python and FastAPI.",
    tags: ["python", "fastapi", "backend"],
    content:
      "FastAPI routes define how clients interact with your backend API. Each route maps an HTTP request to Python logic.",
  },
];
