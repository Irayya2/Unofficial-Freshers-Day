import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertTriangle, FiCheckCircle, FiLock, FiUnlock, FiUser, FiX, FiMail } from 'react-icons/fi'
import { supabase } from '../supabaseClient'
 
const InterestForm = ({ onRegisterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    semester: '',
    division: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('unofficial_freshers_rsvp')
    if (saved) {
      setIsRegistered(true)
      if (onRegisterChange) onRegisterChange(true)
    }
  }, [onRegisterChange])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'
    
    if (!formData.gmail.trim()) {
      newErrors.gmail = 'Gmail is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.gmail.trim())) {
      newErrors.gmail = 'Please enter a valid @gmail.com address'
    }
    
    if (!formData.semester) newErrors.semester = 'Semester is required'
    if (!formData.division) newErrors.division = 'Division is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            "Name": formData.name.trim(),
            "Gmail": formData.gmail.trim(),
            "Semester": formData.semester,
            "Division": formData.division,
          },
        ])

      if (error) {
        throw new Error(error.message)
      }

      // Save to local storage
      localStorage.setItem('unofficial_freshers_rsvp', JSON.stringify(formData))
      setIsRegistered(true)
      setIsOpen(false)
      setShowSuccessToast(true)
      if (onRegisterChange) onRegisterChange(true)

      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowSuccessToast(false)
      }, 4000)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle external triggers to register
  useEffect(() => {
    const handleTriggerRegister = () => {
      setIsOpen(true)
    }
    window.addEventListener('trigger-registration-modal', handleTriggerRegister)
    return () => {
      window.removeEventListener('trigger-registration-modal', handleTriggerRegister)
    }
  }, [])

  return (
    <>
      {/* ── Floating Notification/Alert Banner ── */}
      <AnimatePresence>
        {!isRegistered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-40 max-w-sm rounded-3xl border border-[#FF7A18]/30 bg-[#18181F]/90 p-5 shadow-[0_20px_50px_rgba(255,122,24,0.15)] backdrop-blur-xl md:max-w-md"
          >
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FF7A18]/20 text-[#FF7A18]">
                <FiAlertTriangle size={20} className="animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Action Required for Freshers</h4>
                <p className="text-xs leading-relaxed text-[#B8BDC7]">
                  Interested in the party? You must register your details (Name, Gmail, Sem, Div) now to reserve your spot and unlock Passes & WhatsApp group links.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#FF7A18] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  <FiLock size={12} /> Register Details
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Registration Form Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0B0B0F]/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#3B3B48] bg-[#18181F] p-6 shadow-2xl md:p-8"
            >
              {/* Decorative light bloom in modal */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#8A2BE2]/20 blur-2xl" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-[#FF7A18]/20 blur-2xl" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-xl border border-[#3B3B48] p-2 text-[#B8BDC7] transition hover:bg-[#23232D] hover:text-white"
              >
                <FiX size={18} />
              </button>

              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-3 inline-flex rounded-2xl bg-gradient-to-br from-[#8A2BE2]/20 to-[#FF7A18]/20 p-4 text-[#B026FF]">
                  <FiUnlock size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white">Unlock Opportunities</h3>
                <p className="mt-2 text-sm text-[#B8BDC7]">
                  Provide your details to register for the Unofficial Freshers Event and get access to passes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[#B8BDC7]">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B8BDC7]">
                      <FiUser size={16} />
                    </span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border bg-[#0B0B0F] py-3 pl-10 pr-4 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] ${
                        errors.name ? 'border-red-500' : 'border-[#3B3B48]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Gmail */}
                <div className="space-y-1">
                  <label htmlFor="gmail" className="text-xs font-semibold uppercase tracking-wider text-[#B8BDC7]">
                    Gmail Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B8BDC7]">
                      <FiMail size={16} />
                    </span>
                    <input
                      id="gmail"
                      name="gmail"
                      type="email"
                      placeholder="e.g. johndoe@gmail.com"
                      value={formData.gmail}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border bg-[#0B0B0F] py-3 pl-10 pr-4 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] ${
                        errors.gmail ? 'border-red-500' : 'border-[#3B3B48]'
                      }`}
                    />
                  </div>
                  {errors.gmail && <p className="text-xs text-red-500">{errors.gmail}</p>}
                </div>

                {/* Semester */}
                <div className="space-y-1">
                  <label htmlFor="semester" className="text-xs font-semibold uppercase tracking-wider text-[#B8BDC7]">
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-[#0B0B0F] px-4 py-3 text-sm text-white outline-none transition focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] ${
                      errors.semester ? 'border-red-500' : 'border-[#3B3B48]'
                    }`}
                  >
                    <option value="">Select Semester</option>
                    <option value="Sem 1">Semester 1</option>
                    <option value="Sem 2">Semester 2</option>
                    <option value="Sem 3">Semester 3</option>
                    <option value="Sem 4">Semester 4</option>
                    <option value="Sem 5">Semester 5</option>
                    <option value="Sem 6">Semester 6</option>
                  </select>
                  {errors.semester && <p className="text-xs text-red-500">{errors.semester}</p>}
                </div>

                {/* Division */}
                <div className="space-y-1">
                  <label htmlFor="division" className="text-xs font-semibold uppercase tracking-wider text-[#B8BDC7]">
                    Division
                  </label>
                  <select
                    id="division"
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-[#0B0B0F] px-4 py-3 text-sm text-white outline-none transition focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] ${
                      errors.division ? 'border-red-500' : 'border-[#3B3B48]'
                    }`}
                  >
                    <option value="" className="text-white/40">Select Division</option>
                    <option value="A">Division A</option>
                    <option value="B">Division B</option>
                    <option value="C">Division C</option>

                  </select>
                  {errors.division && <p className="text-xs text-red-500">{errors.division}</p>}
                </div>

                {/* Submit */}
                {submitError && (
                  <p className="text-xs text-red-500 text-center font-medium">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#8A2BE2] via-[#B026FF] to-[#FF7A18] py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Registering...' : 'Complete Registration'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Success Toast Notification ── */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-6 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-green-500/30 bg-[#18181F]/90 p-4 shadow-[0_15px_30px_rgba(0,255,0,0.1)] backdrop-blur-xl"
          >
            <FiCheckCircle className="text-green-500" size={24} />
            <div>
              <p className="font-semibold text-white">Awesome!</p>
              <p className="text-xs text-[#B8BDC7]">All opportunities are now unlocked. Scroll down to claim!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default InterestForm
