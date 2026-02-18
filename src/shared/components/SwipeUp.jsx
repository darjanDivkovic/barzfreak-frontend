const SwipeUp = () => {
  return (
    <div className="mt-12 flex flex-col items-center relative z-10 text-red-600">
      {/* Animated swipe up indicator */}
      <div className="relative animate-swipe-up">
        <svg
          className="w-12 h-12 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 15l7-7 7 7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7 7 7"
            className="opacity-70"
          />
        </svg>
      </div>
    </div>
  );
};

export default SwipeUp;
