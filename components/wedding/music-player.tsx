"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

const INTRO_OPENED_EVENT = "wedding-intro-opened"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const wasPlayingRef = useRef(false)
  const introTimeoutRef = useRef<number | null>(null)

  const startMusic = (delay = 0) => {
    const audio = audioRef.current
    if (!audio) return

    const playAudio = () => {
      if (!audio.paused) return

      audio.play().then(() => {
        setIsPlaying(true)
        setIsLoaded(true)
      }).catch(() => {
        setIsLoaded(true)
      })
    }

    if (delay > 0) {
      if (introTimeoutRef.current !== null) {
        window.clearTimeout(introTimeoutRef.current)
      }

      introTimeoutRef.current = window.setTimeout(playAudio, delay)
      return
    }

    playAudio()
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePauseRequest = () => {
      if (!audio.paused) {
        wasPlayingRef.current = true
        audio.pause()
        setIsPlaying(false)
      }
    }

    const handleResumeRequest = () => {
      if (wasPlayingRef.current) {
        audio.play().then(() => {
          setIsPlaying(true)
          wasPlayingRef.current = false
        }).catch(() => {})
      }
    }

    const handleIntroOpened = () => {
      setIsLoaded(true)
      startMusic(2000)
    }

    window.addEventListener("wedding-pause-music", handlePauseRequest)
    window.addEventListener("wedding-resume-music", handleResumeRequest)
    window.addEventListener(INTRO_OPENED_EVENT, handleIntroOpened)

    // Global listeners for native video elements
    const handleGlobalPlay = (e: Event) => {
      if (e.target instanceof HTMLVideoElement) {
        handlePauseRequest()
      }
    }

    const handleGlobalPause = (e: Event) => {
      if (e.target instanceof HTMLVideoElement) {
        handleResumeRequest()
      }
    }

    // Capture phase to catch non-bubbling play/pause events
    document.addEventListener("play", handleGlobalPlay, true)
    document.addEventListener("pause", handleGlobalPause, true)
    document.addEventListener("ended", handleGlobalPause, true)

    // Listener for YouTube IFrame messages
    const handleYoutubeMessage = (e: MessageEvent) => {
      if (typeof e.data === "string" && e.data.includes("infoDelivery")) {
        try {
          const data = JSON.parse(e.data)
          if (data.event === "infoDelivery" && data.info && data.info.playerState !== undefined) {
            const state = data.info.playerState
            if (state === 1) { // Playing
              handlePauseRequest()
            } else if (state === 2 || state === 0) { // Paused or Ended
              handleResumeRequest()
            }
          }
        } catch (error) {
          // Ignore parse errors
        }
      }
    }

    window.addEventListener("message", handleYoutubeMessage)

    return () => {
      if (introTimeoutRef.current !== null) {
        window.clearTimeout(introTimeoutRef.current)
      }

      window.removeEventListener("wedding-pause-music", handlePauseRequest)
      window.removeEventListener("wedding-resume-music", handleResumeRequest)
      window.removeEventListener(INTRO_OPENED_EVENT, handleIntroOpened)
      document.removeEventListener("play", handleGlobalPlay, true)
      document.removeEventListener("pause", handleGlobalPause, true)
      document.removeEventListener("ended", handleGlobalPause, true)
      window.removeEventListener("message", handleYoutubeMessage)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      startMusic()
    }
  }

  return (
    <>
      {/* Hidden audio element - using a royalty-free wedding music URL */}
      <audio
        ref={audioRef}
        src="/new_song.mp3" /* Change here your new song*/
        preload="auto"
        loop
      />

      {/* Floating music button */}
      <button
        onClick={togglePlay}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full cursor-pointer",
          "bg-accent text-accent-foreground shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110 hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
          isPlaying && "animate-pulse"
        )}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
        )}
        
        {/* Sound wave animation when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
        )}
      </button>

      {/* Initial prompt to enable music */}
      {isLoaded && !isPlaying && (
        <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 animate-fade-in">
          <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 md:px-4 md:py-2 shadow-lg max-w-45 md:max-w-none">
            <p className="text-xs md:text-sm text-muted-foreground">
              Tap to play music
            </p>
          </div>
        </div>
      )}
    </>
  )
}
