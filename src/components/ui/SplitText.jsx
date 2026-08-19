'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = [0.16, 1, 0.3, 1],
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={{ textAlign, justifyContent: textAlign === 'center' ? 'center' : 'flex-start' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + charIndex;

            return (
              <motion.span
                key={charIndex}
                initial={animationFrom}
                animate={isInView ? animationTo : animationFrom}
                transition={{
                  duration: 0.6,
                  delay: (index * delay) / 1000,
                  ease: easing,
                }}
                className="inline-block"
                onAnimationComplete={
                  index === text.replace(/\s/g, '').length - 1
                    ? onLetterAnimationComplete
                    : undefined
                }
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
