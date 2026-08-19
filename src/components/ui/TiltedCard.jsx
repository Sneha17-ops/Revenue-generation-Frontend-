'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export const TiltedCard = ({
  imageSrc,
  altText = '',
  captionTitle = '',
  captionSub = '',
  badgeText = '',
  className = '',
  containerHeight = '500px'
}) => {
  const ref = useRef(null);

  // Mouse position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    // Disable tilt on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-[#FFFFFF] p-3 sm:p-4 rounded-[32px] sm:rounded-[38px] border-2 border-[#D4AF37]/50 shadow-[0_25px_60px_-15px_rgba(11,61,46,0.18)] transition-shadow duration-500"
      >
        {/* Layered Decorative Heritage Background Frame */}
        <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-tr from-[#D4AF37]/20 via-[#F3E5AB]/10 to-transparent opacity-60 blur-xl pointer-events-none" />

        {/* Photo Container */}
        <div className={`relative w-full rounded-[24px] sm:rounded-[30px] overflow-hidden bg-[#FAF7F2]`} style={{ height: containerHeight }}>
          <img 
            src={imageSrc} 
            alt={altText} 
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
          />

          {/* Soft Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/85 via-transparent to-transparent opacity-85 pointer-events-none" />

          {/* Top Heritage Badge */}
          {badgeText && (
            <div className="absolute top-4 left-4 bg-[#FFFFFF]/95 backdrop-blur-md text-[#0B3D2E] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs flex items-center space-x-1.5 z-10">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>{badgeText}</span>
            </div>
          )}

          {/* Bottom Owner Caption Overlay */}
          {(captionTitle || captionSub) && (
            <div className="absolute bottom-4 left-4 right-4 p-3.5 sm:p-4 bg-[#06241B]/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/40 text-[#FAF7F2] space-y-1 z-10">
              {captionTitle && (
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#F3E5AB]">
                  {captionTitle}
                </h3>
              )}
              {captionSub && (
                <p className="text-[11px] text-[#FAF7F2]/80 font-light leading-tight">
                  {captionSub}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Outer Gold Accent Frame Rim */}
        <div className="absolute -inset-1 rounded-[40px] border border-[#D4AF37]/30 pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default TiltedCard;
