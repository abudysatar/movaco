import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import clsx from "clsx";

const MyPagination = ({
  swiperRef,
  activeIndex,
  setActiveIndex,
  genreMoviePairs,
  details = false,
  circled = false,
  none = false,
}) => {
  const bulletsToShow = 4;
  const totalSlides = genreMoviePairs.length;
  const start = Math.floor(activeIndex / bulletsToShow) * bulletsToShow;
  const visibleBullets = genreMoviePairs.slice(start, start + bulletsToShow);

  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === totalSlides - 1;

  const arrowBaseClasses = clsx(
    "flex items-center justify-center text-white transition select-none rounded-[6px] w-11 h-11",
    details && "bg-main-black border border-black-15 rounded-full"
  );

  return (
    <div
      className={clsx(
        "flex gap-2 items-center bg-main-black rounded-[6px] p-2.5 border border-black-12 select-none",
        details && "bg-transparent border-0",
        none && "hidden md:flex"
      )}
    >
      {/* Left Arrow */}
      <div
        className={clsx(
          arrowBaseClasses,
          !isPrevDisabled
            ? "cursor-pointer hover:bg-black-20"
            : "cursor-not-allowed opacity-50"
        )}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (!isPrevDisabled) {
            swiperRef.current.slidePrev();
            setActiveIndex((prev) => prev - 1);
          }
        }}
      >
        <ArrowLeft size={24} />
      </div>

      {/* Bullets */}
      <div className="flex gap-2">
        {visibleBullets.map((_, index) => {
          const actualIndex = start + index;
          const isActive = actualIndex === activeIndex;

          return (
            <div
              key={actualIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                swiperRef.current?.slideToLoop(actualIndex);
                setActiveIndex(actualIndex);
              }}
              className={clsx(
                "transition-all duration-300 transform select-none",
                circled ? "hidden" : "w-[14px] h-1 rounded-full",
                isActive
                  ? "bg-main-red scale-140 shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  : "bg-black-20 hover:bg-main-red/60",
                "cursor-pointer"
              )}
            />
          );
        })}
      </div>

      {/* Right Arrow */}
      <div
        className={clsx(
          arrowBaseClasses,
          !isNextDisabled
            ? "cursor-pointer hover:bg-black-20"
            : "cursor-not-allowed opacity-50"
        )}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (!isNextDisabled) {
            swiperRef.current.slideNext();
            setActiveIndex((prev) => prev + 1);
          }
        }}
      >
        <ArrowRight size={24} />
      </div>
    </div>
  );
};

export default MyPagination;
