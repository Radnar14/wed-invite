"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";

type ScrollRevealProps = ComponentProps<typeof motion.div> & {
  delay?: number;
  distance?: number;
  direction?: "up" | "left" | "right";
};

export function ScrollReveal({
  children,
  delay = 0,
  distance = 24,
  direction = "up",
  transition,
  ...props
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion
    ? { x: 0, y: 0 }
    : {
        x: direction === "left" ? -distance : direction === "right" ? distance : 0,
        y: direction === "up" ? distance : 0,
      };

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={transition ?? { duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}