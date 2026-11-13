'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

const offsetMap: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up:    { y: 24 },
  down:  { y: -24 },
  left:  { x: 28 },
  right: { x: -28 },
  scale: { scale: 0.95, y: 10 },
  fade:  {},
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'p';
};

export function Reveal({
  children,
  direction = 'up',
  delay     = 0,
  duration  = 0.6,
  once      = true,
  className,
  as        = 'div',
}: RevealProps) {
  const offset    = offsetMap[direction];
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
