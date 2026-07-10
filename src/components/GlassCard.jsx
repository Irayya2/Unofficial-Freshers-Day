import { motion } from 'framer-motion'

const GlassCard = ({ children, className = '', hover = true, style }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01, rotate: -0.5 } : undefined}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#23232D]/60 p-6 shadow-[0_20px_80px_rgba(11,11,15,0.45)] backdrop-blur-xl ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
