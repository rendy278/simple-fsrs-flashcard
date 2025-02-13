"use client";
import FlashCard from "./FlashCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { useFsrsDeckStore } from "../store/useStoreFsrsDeck";

const FlashCardCarousel = () => {
  const { decks, filterType } = useFsrsDeckStore();

  if (decks.length === 0) {
    return (
      <p className="text-center text-gray-500">Tidak ada kartu tersedia</p>
    );
  }

  const filteredDecks =
    filterType === "all"
      ? decks
      : decks.filter((card) => card.type === filterType);

  const kotobaCards = filteredDecks.filter((card) => card.type === "kotoba");
  const kanjiCards = filteredDecks.filter((card) => card.type === "kanji");

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2  w-full  h-full">
      {filterType === "all" ? (
        <>
          {kotobaCards.length > 0 && (
            <div className="w-72 md:w-80 lg:w-96">
              <h2 className="text-center text-lg font-semibold mb-4">Kotoba</h2>
              <Swiper
                effect="cards"
                grabCursor
                modules={[EffectCards]}
                className="mySwiper"
              >
                {kotobaCards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <FlashCard card={card} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {kanjiCards.length > 0 && (
            <div className="w-72 md:w-80 lg:w-96">
              <h2 className="text-center text-lg font-semibold mb-4">Kanji</h2>
              <Swiper
                effect="cards"
                grabCursor
                modules={[EffectCards]}
                className="mySwiper"
              >
                {kanjiCards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <FlashCard card={card} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </>
      ) : filteredDecks.length > 0 ? (
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="mySwiper w-72 md:w-80 lg:w-96"
        >
          {filteredDecks.map((card) => (
            <SwiperSlide key={card.id}>
              <FlashCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">
          Belum ada data yang ditambahkan.
        </p>
      )}
    </div>
  );
};

export default FlashCardCarousel;
