interface StaticRectanglesProps {
  className?: string;
}

// Function: StaticRectangles
export default function StaticRectangles({
  className = '',
}: StaticRectanglesProps) {
  // Mobile (< 640px): Outer 315, Inner 265
  // Tablet/Up (>= 640px): Outer 420, Inner 350
  const outerSizeClass = 'w-[315px] h-[315px] sm:w-[420px] sm:h-[420px]';
  const outerWidth = 420; // Base coordinate system for SVG viewBox

  const innerSizeClass = 'w-[265px] h-[265px] sm:w-[350px] sm:h-[350px]';
  const innerWidth = 350; // Base coordinate system for SVG viewBox

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${className}`}
    >
      {/* Outer Rectangle (Rotated 45deg) */}
      <div
        className={`absolute ${outerSizeClass} transition-all duration-300`}
        style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${outerWidth} ${outerWidth}`}
          className="overflow-visible pointer-events-none"
        >
          <rect
            x="1"
            y="1"
            width={outerWidth - 2}
            height={outerWidth - 2}
            fill="none"
            stroke="#C5C8CD"
            strokeWidth="1.5"
            strokeDasharray="0.1 2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Inner Rectangle (Rotated 45deg) */}
      <div
        className={`absolute ${innerSizeClass} transition-all duration-300`}
        style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${innerWidth} ${innerWidth}`}
          className="overflow-visible pointer-events-none"
        >
          <rect
            x="1"
            y="1"
            width={innerWidth - 2}
            height={innerWidth - 2}
            fill="none"
            stroke="#C5C8CD"
            strokeWidth="1.5"
            strokeDasharray="0.1 2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
