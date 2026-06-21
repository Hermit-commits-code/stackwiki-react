export type Category = {
  name: string;
  slug: string;
  description: string;
};

export const mockCategories: Category[] = [
  {
    name: "React",
    slug: "react",
    description:
      "Components, hooks, routing, state, and frontend architecture.",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    description: "Types, props, interfaces, generics, and safer JavaScript.",
  },
  {
    name: "FastAPI",
    slug: "fastapi",
    description:
      "Python APIs, routes, validation, auth, and backend structure.",
  },
];
