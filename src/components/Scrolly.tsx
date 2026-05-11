import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface StepProps {
  id: string;
  index: number;
  activeStep: number;
  children: React.ReactNode;
  onStepEnter: (index: number) => void;
}

export function Step({ id, index, activeStep, children, onStepEnter }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            onStepEnter(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -40% 0px',
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [index, onStepEnter]);

  const isActive = activeStep === index;

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        'min-h-[100vh] flex flex-col justify-center transition-opacity duration-1000 w-full',
        isActive ? 'opacity-100' : 'opacity-30'
      )}
      style={{ paddingBottom: '20vh', paddingTop: '20vh' }}
    >
      <div className="w-full bg-white/60 backdrop-blur-md border-l-4 border-brand p-6 md:p-10 relative shadow-sm">
        <div className="absolute top-0 right-0 p-2 text-slate-400 font-mono text-xs select-none">
          SEC_{String(index).padStart(2, '0')}
        </div>
        {children}
      </div>
    </div>
  );
}
