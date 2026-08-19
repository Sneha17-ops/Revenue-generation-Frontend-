'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const BlurText = ({
  text = '',
  delay = 100,
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  className = '',
  style = {}
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = direction === 'top' 
    ? { filter: 'blur(12px)', opacity: 0, y: -18 }
    : { filter: 'blur(12px)', opacity: 0, y: 18 };

  const defaultTo = { filter: 'blur(0px)', opacity: 1, y: 0 };

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={defaultFrom}
          animate={isInView ? defaultTo : defaultFrom}
          transition={{
            duration: 0.55,
            delay: (i * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block whitespace-pre"
        >
          {el}{animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
