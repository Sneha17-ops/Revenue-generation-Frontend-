'use client';

import React from 'react';

export const GradualBlur = ({
  target = "parent",
  position = "bottom",
  height = "7rem",
  strength = 2,
  divCount = 5,
  curve = "bezier",
  exponential = true,
  opacity = 1,
  className = "",
  style = {}
}) => {
  // Generate division steps for gradual backdrop blur and gradient masking
  const layers = Array.from({ length: divCount }, (_, i) => {
    const progress = (i + 1) / divCount;
    // Cubic bezier style or exponential curve factor
    const factor = exponential ? Math.pow(progress, 2) : progress;
    const blurAmount = (factor * strength * 6).toFixed(1);
    const stopStart = (i * (100 / divCount)).toFixed(1);
    const stopEnd = ((i + 1) * (100 / divCount)).toFixed(1);

    return {
      blurAmount,
      stopStart,
      stopEnd,
      factor
    };
  });

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          top: 0,
          left: 0,
          right: 0,
          height: height,
        };
      case 'left':
        return {
          top: 0,
          bottom: 0,
          left: 0,
          width: height,
        };
      case 'right':
        return {
          top: 0,
          bottom: 0,
          right: 0,
          width: height,
        };
      case 'bottom':
      default:
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height: height,
        };
    }
  };

  const getGradientDirection = () => {
    switch (position) {
      case 'top':
        return 'to top';
      case 'left':
        return 'to left';
      case 'right':
        return 'to right';
      case 'bottom':
      default:
        return 'to bottom';
    }
  };

  return (
    <div
      className={`pointer-events-none select-none ${position === 'bottom' || position === 'top' ? 'absolute inset-x-0' : 'absolute inset-y-0'} ${className}`}
      style={{
        ...getPositionStyles(),
        zIndex: 15,
        opacity: opacity,
        ...style
      }}
    >
      {layers.map((layer, index) => {
        const backdropFilter = `blur(${layer.blurAmount}px)`;
        const maskImage = `linear-gradient(${getGradientDirection()}, transparent ${layer.stopStart}%, black ${layer.stopEnd}%)`;

        return (
          <div
            key={index}
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter,
              WebkitBackdropFilter: backdropFilter,
              maskImage,
              WebkitMaskImage: maskImage,
            }}
          />
        );
      })}
    </div>
  );
};

export default GradualBlur;
