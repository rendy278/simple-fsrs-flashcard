import Link from "next/link";
import React from "react";
import { RiTimerFlashFill } from "react-icons/ri";
const Logo = () => {
  return (
    <Link href="/">
      <div className="flex text-xl items-center gap-2 text-threePrimary">
        <h1 className="font-bold">Flash DeckCard</h1>
        <RiTimerFlashFill />
      </div>
      <p className="text-xs w-48 md:w-full">
        Learn your Japanese language quickly and flexibly
      </p>
    </Link>
  );
};

export default Logo;
