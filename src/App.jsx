import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiCamera,
  FiCheckCircle,
  FiGift,
  FiInstagram,
  FiMapPin,
  FiMusic,
  FiPhone,
  FiStar,
  FiUsers,
} from 'react-icons/fi'
import { IoGameControllerOutline } from 'react-icons/io5'
import SectionTitle from './components/SectionTitle'
import GlassCard from './components/GlassCard'
import { highlights, testimonials, whyAttend } from './data/eventInfo'
import VideoBanner from './components/VideoBanner'
import InterestForm from './components/InterestForm'
import djImage from './components/dj-party.png'
import funGamesImage from './components/fun-games.png'
import surpriseGiftsImage from './components/surprise-gifts.png'
import photoBoothImage from './components/photo-booth.png'
import meetSeniorsImage from './components/meet-seniors.png'
import unlimitedFunImage from './components/unlimited-fun.png'
import video2 from './components/16510380-hd_1920_1080_60fps.mp4'
import video3 from './components/WhatsApp Video 2026-07-10 at 8.47.34 PM.mp4'
import video4 from './components/WhatsApp Video 2026-07-10 at 8.47.39 PM.mp4'

const iconMap = {
  music: FiMusic,
  game: IoGameControllerOutline,
  gift: FiGift,
  camera: FiCamera,
  users: FiUsers,
  sparkles: FiStar,
}

function App() {
  const [, setIsRegistered] = useState(false)

  useEffect(() => {
    AOS.init({ once: true, duration: 800, offset: 120 })
  }, [])

  return (
    <div className="relative overflow-hidden text-[#F5F5F5]">
      {/* ── Floating Water Bubbles ── */}
      <div className="water-bubbles-container">
        <div className="bubble bubble-1" />
        <div className="bubble bubble-2" />
        <div className="bubble bubble-3" />
        <div className="bubble bubble-4" />
        <div className="bubble bubble-5" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
        <div className="blob blob-three" />
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="particle"
            style={{
              left: `${(index * 7) % 100}%`,
              top: `${(index * 13) % 100}%`,
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
      </div>


      {/* ── Hero Banner — full viewport width ── */}
      <section className="relative min-h-[650px] w-full overflow-hidden sm:min-h-[700px] lg:min-h-[850px] flex items-center justify-center">
          {/* ── Background Banner Video Playlist ── */}
          <VideoBanner />
          
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/30 to-[#0B0B0F]/45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(138,43,226,0.15),_transparent_70%)]" />



          {/* ── Scroll Down Indicator ── */}
          <div className="absolute inset-x-0 bottom-6 flex justify-center z-10">
            <a href="#why-attend" className="scroll-indicator flex flex-col items-center gap-1.5 text-white/70 transition hover:text-white">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>
      </section>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-10 sm:px-6 lg:px-8">

        {/* ── Why Attend ── */}
        <section id="why-attend" className="space-y-8 py-6">
          <SectionTitle
            eyebrow="Why You Should Attend"
            title="Every moment is designed to feel like a celebration"
            description="From the first beat of the DJ set to the final photo with your new friends, this event is built to make your fresher experience unforgettable."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whyAttend.map((item, index) => {
              const Icon = iconMap[item.icon]
              const isLiveDJ = item.title === 'Live DJ Party'
              const isFunGames = item.title === 'Fun Games'
              const isSurpriseGifts = item.title === 'Surprise Gifts'
              const isPhotoBooth = item.title === 'Photo Booth'
              const isMeetSeniors = item.title === 'Meet Seniors'
              const isUnlimitedFun = item.title === 'Unlimited Fun'
              
              let cardStyle = undefined
              if (isLiveDJ) {
                cardStyle = {
                  backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 15, 0.4), rgba(11, 11, 15, 0.95)), url(${djImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              } else if (isFunGames) {
                cardStyle = {
                  backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 15, 0.4), rgba(11, 11, 15, 0.95)), url(${funGamesImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              } else if (isSurpriseGifts) {
                cardStyle = {
                  backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 15, 0.4), rgba(11, 11, 15, 0.95)), url(${surpriseGiftsImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              } else if (isPhotoBooth) {
                cardStyle = {
                  backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 15, 0.4), rgba(11, 11, 15, 0.95)), url(${photoBoothImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              } else if (isUnlimitedFun) {
                cardStyle = {
                  backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 15, 0.4), rgba(11, 11, 15, 0.95)), url(${unlimitedFunImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              } else if (isMeetSeniors) {
                cardStyle = {
                  backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 15, 0.4), rgba(11, 11, 15, 0.95)), url(${meetSeniorsImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              }
              
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                  <GlassCard 
                    className="h-full border-[#3B3B48] relative overflow-hidden"
                    style={cardStyle}
                  >
                    <div className="relative z-10">
                      <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[#8A2BE2]/20 to-[#FF7A18]/20 p-3 text-[#B026FF]">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#F5F5F5] font-medium">{item.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── Highlights ── */}
        <section id="highlights" className="space-y-8 py-6">
          <SectionTitle
            eyebrow="Event Highlights"
            title="A full evening of energy, connection, and celebration"
            description="Each part of the night is crafted to keep your excitement rising from the first hello to the last dance beat."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {highlights.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
                <GlassCard className="flex h-full items-center justify-center border-[#3B3B48] text-center text-lg font-semibold text-white">
                  {item}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>


        {/* ── Gallery ── */}
        <section className="space-y-8 py-6">
          <SectionTitle
            eyebrow="Gallery Preview"
            title="Preview the party energy"
            description="These mood-board visuals capture the glamour, music, and excitement of the freshers celebration."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[video2, video3, video4].map((videoSrc, index) => (
              <motion.div key={index} whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.2 }}>
                <GlassCard className="overflow-hidden border-[#3B3B48] p-0 h-64">
                  <video
                    src={videoSrc}
                    muted
                    autoPlay
                    playsInline
                    loop
                    className="h-full w-full object-cover"
                  />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="space-y-8 py-6">
          <SectionTitle
            eyebrow="What Students Are Saying"
            title="The kind of night that becomes a campus legend"
            description="Freshers from across the college are already talking about the energy, the crowd, and the memories waiting to be made."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }}>
                <GlassCard className="h-full border-[#3B3B48]">
                  <div className="mb-4 flex items-center gap-2 text-[#FFD166]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <FiStar key={starIndex} />
                    ))}
                  </div>
                  <p className="text-sm leading-8 text-[#B8BDC7]">"{testimonial.quote}"</p>
                  <div className="mt-5">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-[#B8BDC7]">{testimonial.role}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>



        {/* ── Event Rules ── */}
        <section className="py-6">
          <GlassCard className="border-[#3B3B48]">
            <SectionTitle eyebrow="Event Rules" title="Be part of the celebration responsibly" description="A smooth, safe, and joyful night for everyone starts with a few simple expectations." centered={false} />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#3B3B48] bg-[#0B0B0F]/50 p-4 text-sm leading-8 text-[#B8BDC7]">
                <p className="mb-3 flex items-center gap-2 font-semibold text-white"><FiCheckCircle className="text-[#B026FF]" /> Respect everyone around you</p>
                Follow the event guide, keep the spirit positive, and make space for each person to enjoy the evening.
              </div>
              <div className="rounded-2xl border border-[#3B3B48] bg-[#0B0B0F]/50 p-4 text-sm leading-8 text-[#B8BDC7]">
                <p className="mb-3 flex items-center gap-2 font-semibold text-white"><FiCheckCircle className="text-[#B026FF]" /> Enjoy responsibly</p>
                Stay mindful of campus etiquette and help keep the celebration safe, fun, and welcoming.
              </div>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#3B3B48] bg-[#0B0B0F]/80 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-center text-sm text-[#B8BDC7] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="https://instagram.com" className="flex items-center gap-2 transition hover:text-[#B026FF]"><FiInstagram /> Instagram</a>
            <a href="https://wa.me" className="flex items-center gap-2 transition hover:text-[#B026FF]"><FiPhone /> WhatsApp</a>
            <span className="flex items-center gap-2"><FiMapPin /> Main Campus, Block B</span>
          </div>
          <p>Made with ❤️ for Freshers</p>
        </div>
      </footer>


      <InterestForm onRegisterChange={setIsRegistered} />
    </div>
  )
}

export default App
