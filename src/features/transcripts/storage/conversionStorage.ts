import type { ArticleMetadata } from "../utils/generateArticleDraft";

const STORAGE_KEY = "stackwiki_conversions";

export type SavedConversion = {
  id: string;
  title: string;
  category: string;
  status: "Draft" | "Published";
  markdown: string;
  transcript: string;
  metadata: ArticleMetadata;
  createdAt: string;
};

export function getSavedConversions(): SavedConversion[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as SavedConversion[];
  } catch {
    return [];
  }
}

export function saveConversion(conversion: SavedConversion) {
  const existingConversions = getSavedConversions();

  const updatedConversions = [conversion, ...existingConversions];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConversions));
}

export function updateConversion(updatedConversion: SavedConversion) {
  const existingConversions = getSavedConversions();

  const updatedConversions = existingConversions.map((conversion) =>
    conversion.id === updatedConversion.id ? updatedConversion : conversion,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConversions));
}
