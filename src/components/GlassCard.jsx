import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const GlassCard = ({ children, className = '', hover = true, style }) => {
  const [isActive, setIsActive] = useState(false)
  // A counter that forces the animation overlay to re-mount and replay on every click
  const [clickKey, setClickKey] = useState(0)

  const handleClick = useCallback(() => {
    setIsActive((prev) => !prev)
    setClickKey((prev) => prev + 1)
  }, [])

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01, rotate: -0.5 } : undefined}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`glass-card-clickable rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-card-alpha)] p-6 shadow-[var(--theme-glass-card-shadow)] backdrop-blur-xl transition-all duration-300 ${isActive ? 'glass-card--active' : ''} ${className}`}
      style={style}
      onClick={handleClick}
    >
      {/* Cyan pulse overlay — re-mounts on every click to replay animation */}
      <span key={clickKey} className="glass-card-pulse" />
      {children}
    </motion.div>
  )
}

export default GlassCard
