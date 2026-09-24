import { useEffect, useRef } from 'react';

interface RotatingRectanglesProps {
  variant?: 'large' | 'small';
  sizeTier?: 'default' | 'compact';
  className?: string;
}

// Dimensions for various rotating rectangles
const sizeConfig = {
  large: {
    default: {
      outer: 'w-[290px] h-[290px] md:w-[530px] md:h-[530px]',
      middle: 'w-[260px] h-[260px] md:w-[480px] md:h-[480px]',
      inner: 'w-[230px] h-[230px] md:w-[430px] md:h-[430px]',
      outerMobileRect: '288',
      middleMobileRect: '258',
      innerMobileRect: '228',
    },
    compact: {
      outer: 'w-[190px] h-[190px] md:w-[530px] md:h-[530px]',
      middle: 'w-[160px] h-[160px] md:w-[480px] md:h-[480px]',
      inner: 'w-[130px] h-[130px] md:w-[430px] md:h-[430px]',
      outerMobileRect: '188',
      middleMobileRect: '158',
      innerMobileRect: '128',
    },
  },
  small: {
    default: {
      outer: 'w-[290px] h-[290px] md:w-[345px] md:h-[345px]',
      middle: 'w-[260px] h-[260px] md:w-[315px] md:h-[315px]',
      inner: 'w-[230px] h-[230px] md:w-[285px] md:h-[285px]',
      outerMobileRect: '288',
      middleMobileRect: '258',
      innerMobileRect: '228',
    },
    compact: {
      outer: 'w-[190px] h-[190px] md:w-[345px] md:h-[345px]',
      middle: 'w-[160px] h-[160px] md:w-[315px] md:h-[315px]',
      inner: 'w-[130px] h-[130px] md:w-[285px] md:h-[285px]',
      outerMobileRect: '188',
      middleMobileRect: '158',
      innerMobileRect: '128',
    },
  },
};

// Function: RotatingRectangles
export default function RotatingRectangles({
  variant = 'large',
  sizeTier = 'default',
  className = '',
}: RotatingRectanglesProps) {
  const isLarge = variant === 'large';

  // Retrieve dimensions
  const config = sizeConfig[variant][sizeTier];

  const outerRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let outerAngle = 65;
    let middleAngle = 55;
    let innerAngle = 45;

    const isMobile = window.innerWidth < 768;
    const speedMultiplier = isMobile ? 0.5 : 1.0;

    const animate = () => {
      outerAngle += 0.3 * speedMultiplier;
      middleAngle += 0.2 * speedMultiplier;
      innerAngle += 0.1 * speedMultiplier;

      if (outerRef.current)
        outerRef.current.style.transform = `rotate(${outerAngle}deg) translateZ(0)`;
      if (middleRef.current)
        middleRef.current.style.transform = `rotate(${middleAngle}deg) translateZ(0)`;
      if (innerRef.current)
        innerRef.current.style.transform = `rotate(${innerAngle}deg) translateZ(0)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${className}`}
    >
      {/* Outer Rectangle */}
      <div ref={outerRef} className={`absolute ${config.outer}`}>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible pointer-events-none md:hidden"
        >
          <rect
            x="1"
            y="1"
            width={config.outerMobileRect}
            height={config.outerMobileRect}
            fill="none"
            stroke="#C5C8CD"
            strokeWidth="1.1"
            strokeDasharray="0.1 4"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible pointer-events-none hidden md:block"
        >
          <rect
            x="1"
            y="1"
            width={isLarge ? '528' : '343'}
            height={isLarge ? '528' : '343'}
            fill="none"
            stroke="#C5C8CD"
            strokeWidth="1.5"
            strokeDasharray="0.1 8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Middle Rectangle */}
      <div ref={middleRef} className={`absolute ${config.middle}`}>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible pointer-events-none md:hidden"
        >
          <rect
            x="1"
            y="1"
            width={config.middleMobileRect}
            height={config.middleMobileRect}
            fill="none"
            stroke="#A0A4AB"
            strokeWidth="1.1"
            strokeDasharray="0.1 4"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible pointer-events-none hidden md:block"
        >
          <rect
            x="1"
            y="1"
            width={isLarge ? '478' : '313'}
            height={isLarge ? '478' : '313'}
            fill="none"
            stroke="#A0A4AB"
            strokeWidth="1.5"
            strokeDasharray="0.1 8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Inner Rectangle */}
      <div ref={innerRef} className={`absolute ${config.inner}`}>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible pointer-events-none md:hidden"
        >
          <rect
            x="1"
            y="1"
            width={config.innerMobileRect}
            height={config.innerMobileRect}
            fill="none"
            stroke="#A0A4AB"
            strokeWidth="1.1"
            strokeDasharray="0.1 4"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible pointer-events-none hidden md:block"
        >
          <rect
            x="1"
            y="1"
            width={isLarge ? '428' : '283'}
            height={isLarge ? '428' : '283'}
            fill="none"
            stroke="#4A4E55"
            strokeWidth="1.5"
            strokeDasharray="0.1 8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
