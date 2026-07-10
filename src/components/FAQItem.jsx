import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="rounded-2xl border border-[#3B3B48] bg-[#0B0B0F]/40 p-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <FiChevronDown className="text-[#B026FF]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-7 text-[#B8BDC7]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQItem
