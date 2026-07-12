import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function AnimatedNumber({ value, suffix = '' }) {
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)
  const mounted = useRef(false)

  useEffect(() => {
    spring.set(value)
    mounted.current = true
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}
