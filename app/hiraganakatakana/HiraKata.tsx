"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hiragana } from "@/constant/hiragana";
import { katakana } from "@/constant/katakana";

export const HiraKata = () => {
  const columns = ["", "a", "i", "u", "e", "o"];
  const rows = ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"];

  return (
    <div className="w-full  mx-auto">
      <Tabs defaultValue="hiragana" className="w-full">
        <TabsList className="flex w-full border-b border-gray-700">
          <TabsTrigger
            value="hiragana"
            className="flex-1 py-2 text-center font-semibold border-b-2 transition-all
  data-[state=active]:border-black data-[state=active]:dark:border-primary
  data-[state=inactive]:border-transparent 
  hover:bg-primary hover:text-white"
          >
            Hiragana
          </TabsTrigger>
          <TabsTrigger
            value="katakana"
            className="flex-1 py-2 text-center font-semibold border-b-2 transition-all
  data-[state=active]:border-black data-[state=active]:dark:border-primary
  data-[state=inactive]:border-transparent 
  hover:bg-primary hover:text-white"
          >
            Katakana
          </TabsTrigger>
        </TabsList>
        {/* Tabel Hiragana */}
        <TabsContent value="hiragana">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-center">
              <thead>
                <tr className="border-b border-gray-700">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-r border-gray-700"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hiragana.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-700">
                    <td className="py-2 px-4 font-bold border-r border-gray-700">
                      {rows[rowIndex]}
                    </td>
                    {row.kana.slice(0, 5).map((char, colIndex) => (
                      <td
                        key={colIndex}
                        className="py-2 px-4 border-r border-gray-700"
                      >
                        <div className="text-xl font-bold">{char}</div>
                        <div className="text-xs">{row.romaji[colIndex]}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Tabel Katakana */}
        <TabsContent value="katakana">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-center">
              <thead>
                <tr className="border-b border-gray-700">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-r border-gray-700"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {katakana.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-700">
                    <td className="py-2 px-4 font-bold border-r border-gray-700">
                      {rows[rowIndex]}
                    </td>
                    {row.kana.slice(0, 5).map((char, colIndex) => (
                      <td
                        key={colIndex}
                        className="py-2 px-4 border-r border-gray-700"
                      >
                        <div className="text-xl font-bold">{char}</div>
                        <div className="text-xs">{row.romaji[colIndex]}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
