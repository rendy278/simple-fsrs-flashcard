"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useFsrsDeckStore } from "@/store/useStoreFsrsDeck";
import { nanoid } from "nanoid";
import { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const { addDeck } = useFsrsDeckStore();
  const [tab, setTab] = useState("kotoba");
  const [formData, setFormData] = useState({
    word: "",
    meaning: "",
    onyomi: "",
    kunyomi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.word || !formData.meaning) return;
    addDeck({
      id: nanoid(),
      type: tab as "kotoba" | "kanji",
      word: formData.word,
      meaning: formData.meaning,
      onyomi: tab === "kanji" ? formData.onyomi : undefined,
      kunyomi: tab === "kanji" ? formData.kunyomi : undefined,
    });
    setFormData({ word: "", meaning: "", onyomi: "", kunyomi: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md text-white">
        <DialogHeader>
          <DialogTitle className="font-bold">Create Deck</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 pb-2">
            <TabsTrigger
              value="kotoba"
              className="w-full py-2 text-white bg-gray-800 rounded-t-md data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Kotoba
            </TabsTrigger>
            <TabsTrigger
              value="kanji"
              className="w-full py-2 text-white bg-gray-800 rounded-t-md data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Kanji
            </TabsTrigger>
          </TabsList>
          <TabsContent value="kotoba">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-gray-900 dark:text-white"
            >
              <input
                type="text"
                name="word"
                value={formData.word}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                placeholder="Masukkan kotoba..."
              />
              <input
                type="text"
                name="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                placeholder="Masukkan artinya..."
              />
            </motion.form>
          </TabsContent>
          <TabsContent value="kanji">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-gray-900 dark:text-white"
            >
              <input
                type="text"
                name="word"
                value={formData.word}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                placeholder="Masukkan kanji..."
              />
              <input
                type="text"
                name="onyomi"
                value={formData.onyomi}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                placeholder="Masukkan onyomi..."
              />
              <input
                type="text"
                name="kunyomi"
                value={formData.kunyomi}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                placeholder="Masukkan kunyomi..."
              />
              <input
                type="text"
                name="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                placeholder="Masukkan artinya..."
              />
            </motion.form>
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex text-white justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button onClick={handleSave}>Simpan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
