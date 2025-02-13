"use client";
import { useFsrsDeckStore } from "../store/useStoreFsrsDeck";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FlashCardFilter = () => {
  const { filterType, setFilterType } = useFsrsDeckStore();

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {filterType === "all"
              ? "Semua"
              : filterType === "kanji"
              ? "Kanji"
              : "Kotoba"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="bg-primary text-white">
          <DropdownMenuItem onClick={() => setFilterType("all")}>
            Semua
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterType("kanji")}>
            Kanji
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterType("kotoba")}>
            Kotoba
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FlashCardFilter;
