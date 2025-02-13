import FlashCardCarousel from "@/components/FlashCardCarousel";
import FlashCardFilter from "@/components/FlashCardFilter";

const page = () => {
  return (
    <div className="px-4 flex flex-col items-center gap-4  py-6">
      <FlashCardFilter />

      <FlashCardCarousel />
    </div>
  );
};

export default page;
