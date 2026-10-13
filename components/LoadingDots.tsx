interface LoadingDotsProps {
  color?: string;
  spacing?: string;
  pt?: string;
  dotSize?: string;
}

// Function: LoadingDots
export default function LoadingDots({
  color = 'bg-[#1A1B1C]/50', // Slightly darker for enhanced visibility
  spacing = 'space-x-4',
  pt = 'pt-1',
  dotSize = 'w-2 h-2',
}: LoadingDotsProps) {
  return (
    <div className={`flex ${spacing} ${pt}`} aria-hidden="true">
      <div className={`${dotSize} ${color} rounded-full animate-bounce`} />
      <div
        className={`${dotSize} ${color} rounded-full animate-bounce [animation-delay:0.2s]`}
      />
      <div
        className={`${dotSize} ${color} rounded-full animate-bounce [animation-delay:0.4s]`}
      />
    </div>
  );
}
