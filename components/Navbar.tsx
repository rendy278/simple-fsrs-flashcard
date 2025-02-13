"use client";

import { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import ToogleNightMode from "./ToogleNightMode";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import { TbLanguageHiragana } from "react-icons/tb";
import Modal from "./Modals";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="w-full h-full shadow-xl bg-primary text-white">
      <div className="flex p-4 justify-between items-center">
        <Logo />
        <div className="flex gap-2 items-center">
          <ToogleNightMode />

          <Button asChild variant="outline" className="p-3">
            <Link href="/hiraganakatakana">
              <TbLanguageHiragana />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="p-3"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
