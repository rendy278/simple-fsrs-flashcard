"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useFsrsDeckStore } from "@/store/useStoreFsrsDeck";
import { Button } from "./ui/button";
import { DeckType } from "@/types/deckType";

const FlashCard = ({ card }: { card: DeckType }) => {
  const reviewQualities = [
    { value: 0, label: "Lupa total" },
    { value: 1, label: "Sulit" },
    { value: 2, label: "Cukup" },
    { value: 3, label: "Sangat mudah" },
  ];

  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState(card.word);
  const [editedMeaning, setEditedMeaning] = useState(card.meaning);

  const { updateDeck, deleteDeck, reviewDeck, getNextCard } =
    useFsrsDeckStore();

  const handleCardClick = useCallback(() => {
    if (!isEditing) setIsFlipped((prev) => !prev);
  }, [isEditing]);

  const handleSaveEdit = useCallback(() => {
    if (!editedWord.trim() || !editedMeaning.trim()) {
      alert("Kata dan arti tidak boleh kosong!");
      return;
    }
    updateDeck(card.id, { word: editedWord, meaning: editedMeaning });
    setIsEditing(false);
  }, [editedWord, editedMeaning, updateDeck, card.id]);

  const handleCancelEdit = useCallback(() => {
    setEditedWord(card.word);
    setEditedMeaning(card.meaning);
    setIsEditing(false);
  }, [card.word, card.meaning]);

  const handleReview = useCallback(
    (quality: number) => {
      reviewDeck(card.id, quality);
      setIsFlipped(false);
      setTimeout(() => {
        const nextCard = getNextCard();
        if (nextCard) console.log("Next card:", nextCard);
      }, 300);
    },
    [reviewDeck, getNextCard, card.id]
  );

  return (
    <div
      className="relative w-full h-60 cursor-pointer perspective-1000"
      onClick={handleCardClick}
    >
      <motion.div
        className={`absolute w-full h-full rounded-lg shadow-lg bg-red-500 flex flex-col items-center justify-center text-2xl font-bold p-4 ${
          isFlipped ? "hidden" : ""
        }`}
        initial={false} // Tidak ada animasi saat refresh
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-3 left-3 text-sm text-white">
          <p>Repetisi: {card.repetitions}</p>
          <p>
            Due Date:{" "}
            {new Date(card.dueDate).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {!isEditing ? (
          <span className="text-4xl">{card.word}</span>
        ) : (
          <input
            type="text"
            className="w-full p-2 rounded"
            value={editedWord}
            onChange={(e) => setEditedWord(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <div className="flex gap-3 absolute bottom-4">
          {isEditing ? (
            <>
              <Button
                className="bg-green-500 text-white rounded"
                onClick={handleSaveEdit}
              >
                Simpan
              </Button>
              <Button
                className="bg-gray-500 text-white rounded"
                onClick={handleCancelEdit}
              >
                Batal
              </Button>
            </>
          ) : (
            <Button
              className="bg-secondPrimary text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
          )}
          <Button
            className="bg-red-700 text-white px-3 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation();
              deleteDeck(card.id);
            }}
          >
            Hapus
          </Button>
        </div>
      </motion.div>

      <motion.div
        className={`absolute w-full h-full rounded-lg bg-red-500 shadow-lg flex flex-col items-center justify-center text-2xl font-bold p-4 ${
          !isFlipped ? "hidden" : ""
        }`}
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          {card.type === "kotoba" ? (
            <p className="text-xl font-semibold">{card.meaning}</p>
          ) : (
            <div className="flex items-center justify-between gap-20">
              <p className="text-4xl font-semibold">{card.word}</p>
              <div>
                <p className="text-sm">Onyomi: {card.onyomi || "-"}</p>
                <p className="text-sm">Kunyomi: {card.kunyomi || "-"}</p>
                <p className="text-sm">Arti: {card.meaning}</p>
              </div>
            </div>
          )}
        </div>
        {!isEditing && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {reviewQualities.map((quality) => (
              <Button
                key={quality.value}
                className="bg-secondPrimary text-white px-3 py-1 rounded"
                onClick={() => handleReview(quality.value)}
              >
                {quality.label}
              </Button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FlashCard;
