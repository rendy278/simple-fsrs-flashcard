import { DeckType } from "@/types/deckType";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface DeckState {
  decks: DeckType[];
  filterType: "all" | "kanji" | "kotoba";
  setFilterType: (type: "all" | "kanji" | "kotoba") => void;
  addDeck: (
    deck: Omit<DeckType, "interval" | "dueDate" | "easeFactor" | "repetitions">
  ) => void;
  updateDeck: (id: string, updatedDeck: Partial<DeckType>) => void;
  deleteDeck: (id: string) => void;
  reviewDeck: (id: string, quality: number) => void;
  getNextCard: () => DeckType | undefined;
}

export const useFsrsDeckStore = create<DeckState>()(
  devtools(
    persist(
      (set, get) => ({
        decks: [],
        filterType: "all",
        setFilterType: (type) => set({ filterType: type }),

        addDeck: (deck) =>
          set((state) => ({
            decks: [
              ...state.decks,
              {
                ...deck,
                interval: 1,
                dueDate: Date.now() + 24 * 60 * 60 * 1000, // 1 hari ke depan
                easeFactor: 2.5,
                repetitions: 0,
              },
            ],
          })),

        updateDeck: (id, updatedDeck) =>
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === id ? { ...deck, ...updatedDeck } : deck
            ),
          })),

        deleteDeck: (id) =>
          set((state) => ({
            decks: state.decks.filter((deck) => deck.id !== id),
          })),

        reviewDeck: (id, quality) => {
          set((state) => {
            const updatedDecks = state.decks.map((deck) => {
              if (deck.id !== id) return deck;

              const { interval, easeFactor, repetitions } = deck;
              const { newInterval, newEaseFactor, newRepetitions } =
                calculateFSRS(interval, easeFactor, repetitions, quality);

              return {
                ...deck,
                interval: newInterval,
                dueDate: Date.now() + newInterval * 24 * 60 * 60 * 1000,
                easeFactor: newEaseFactor,
                repetitions: newRepetitions,
              };
            });

            return {
              decks: updatedDecks.sort((a, b) => a.dueDate - b.dueDate),
            };
          });
        },

        getNextCard: () => {
          const { filterType, decks } = get();
          return decks
            .filter((deck) => filterType === "all" || deck.type === filterType)
            .sort((a, b) => a.dueDate - b.dueDate) // Urutkan berdasarkan due date
            .find((deck) => deck.dueDate <= Date.now());
        },
      }),
      { name: "deck-storage" }
    )
  )
);

const calculateFSRS = (
  currentInterval: number,
  easeFactor: number,
  repetitions: number,
  quality: number
) => {
  let newEaseFactor = easeFactor;
  let newRepetitions = repetitions;
  let newInterval = currentInterval;

  if (quality === 0) {
    // Lupa total: Reset repetisi dan interval ke nilai awal
    newRepetitions = 0;
    newInterval = 1; // 1 hari lagi
  } else {
    // Penyesuaian ease factor berdasarkan kualitas
    newEaseFactor = Math.max(
      1.3, // Minimum ease factor
      Math.min(
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
        2.5 // Maximum ease factor
      )
    );

    // Penyesuaian interval berdasarkan repetisi
    newRepetitions += 1;
    if (newRepetitions === 1) {
      newInterval = 1; // 1 hari pertama
    } else if (newRepetitions === 2) {
      newInterval = 6; // 6 hari setelahnya
    } else {
      newInterval = Math.max(1, Math.round(currentInterval * easeFactor));
    }
  }

  return { newInterval, newEaseFactor, newRepetitions };
};
