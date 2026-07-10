import { useState, useEffect, useRef } from 'react'
import video1 from './16476271-hd_1920_1080_60fps.mp4'
import video2 from './16510380-hd_1920_1080_60fps.mp4'
import video3 from './WhatsApp Video 2026-07-10 at 8.47.34 PM.mp4'
import video4 from './WhatsApp Video 2026-07-10 at 8.47.39 PM.mp4'

const videos = [video1, video2, video3, video4]

const VideoBanner = () => {
  const [showVideo, setShowVideo] = useState(false)
  const currentIndexRef = useRef(0)
  const [videoSrc, setVideoSrc] = useState(videos[0])
  const [opacity, setOpacity] = useState(0)
  const videoRef = useRef(null)
  const isTransitioning = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
      // Smoothly fade in the video banner
      setOpacity(1)
    }, 60000) // 1 minute delay (60,000ms)
    return () => clearTimeout(timer)
  }, [])

  const transitionToNext = () => {
    if (!showVideo || isTransitioning.current) return
    isTransitioning.current = true
    
    const nextIndex = (currentIndexRef.current + 1) % videos.length
    currentIndexRef.current = nextIndex
    setVideoSrc(videos[nextIndex])
    
    // Wait briefly for the new source to be bound, then play it immediately
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
          .then(() => {
            isTransitioning.current = false
          })
          .catch((err) => {
            console.log('Video play error:', err)
            isTransitioning.current = false
          })
      } else {
        isTransitioning.current = false
      }
    }, 100)
  }

  const handleTimeUpdate = (e) => {
    if (e.target.currentTime >= 8) {
      transitionToNext()
    }
  }

  const handleEnded = () => {
    transitionToNext()
  }

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay play error:', err)
      })
    }
  }, [videoSrc, showVideo])

  return (
    <div className="absolute inset-0 h-full w-full bg-[#0B0B0F]">
      {/* Background banner image shown initially, fades to black completely when video plays */}
      <img
        src="/hero-banner.jpg"
        alt="Unofficial Freshers Banner"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: showVideo ? 0 : 1 }}
      />
      
      {showVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity }}
        />
      )}
    </div>
  )
}

export default VideoBanner
