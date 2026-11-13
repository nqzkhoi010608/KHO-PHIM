'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

const containerVariants = {
  hidden:  {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.04 },
  }),
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

type StaggerGroupProps = {
  children:  ReactNode;
  className?: string;
  stagger?:  number;
  as?:       'div' | 'section' | 'ul' | 'ol';
  once?:     boolean;
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.065,
  as      = 'div',
  once    = true,
}: StaggerGroupProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-30px' }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children:  ReactNode;
  className?: string;
  as?:       'div' | 'li' | 'article';
};

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
