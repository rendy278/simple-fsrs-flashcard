export type DeckType = {
  id: string;
  type: "kotoba" | "kanji";
  word: string;
  meaning: string;
  onyomi?: string;
  kunyomi?: string;
  interval?: number;
  dueDate?: number;
};
