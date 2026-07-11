import { motion } from 'framer-motion'

// Transições lentas e discretas — nunca bruscas.
export const EASE = [0.22, 1, 0.36, 1]

export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.25, ease: EASE } },
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function Reveal({ children, className, as = 'div', ...props }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      {...props}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({ children, className, as = 'div', ...props }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp className={className} variants={staggerItem} {...props}>
      {children}
    </Comp>
  )
}

export const cardHover = {
  whileHover: { y: -3, transition: { duration: 0.35, ease: EASE } },
  whileTap: { scale: 0.985 },
}
