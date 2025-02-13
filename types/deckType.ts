export type DeckType = {
  id: string;
  type: "kotoba" | "kanji";
  word: string;
  meaning: string;
  onyomi?: string;
  kunyomi?: string;
  interval: number; // Interval dalam hari
  dueDate: number; // Timestamp kapan kartu harus direview
  easeFactor: number; // Faktor kemudahan (default 2.5)
  repetitions: number; // Jumlah pengulangan berhasil
};
