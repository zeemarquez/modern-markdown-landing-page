import React, { useState, useRef, useCallback, useEffect } from 'react';

interface CompareSliderProps {
  leftImage: string;
  rightImage: string;
  className?: string;
}

const CompareSlider: React.FC<CompareSliderProps> = ({ leftImage, rightImage, className = '' }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl border border-border bg-white shadow-2xl h-[600px] md:h-[700px] cursor-col-resize select-none ${className}`}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Right Image (Background - Visual Mode) */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={rightImage} 
          alt="Visual Mode" 
          className="w-full object-cover"
          style={{ height: '120%', transform: 'translateY(-8%)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x600/f4f4f5/71717a?text=Visual+Mode`;
          }}
        />
      </div>

      {/* Left Image (Foreground - Raw Mode, clipped) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={leftImage} 
          alt="Raw Mode" 
          className="w-full object-cover"
          style={{ height: '120%', transform: 'translateY(-8%)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x600/09090b/ffffff?text=Raw+Markdown`;
          }}
        />
      </div>

      {/* Divider Line */}
      <div 
        className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Slider Handle */}
      <div 
        className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-border shadow-xl flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="flex gap-0.5">
          <div className="w-0.5 h-3 bg-muted-foreground rounded-full"></div>
          <div className="w-0.5 h-3 bg-muted-foreground rounded-full"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-30 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-wider">
        Raw Syntax
      </div>
      <div className="absolute bottom-4 right-4 z-30 px-2 py-1 bg-white/80 backdrop-blur rounded text-[10px] font-bold text-foreground uppercase tracking-wider border border-border shadow-sm">
        Visual WYSIWYG
      </div>
    </div>
  );
};

export default CompareSlider;