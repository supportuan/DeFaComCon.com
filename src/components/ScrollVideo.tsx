import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollVideoProps = {
  src: string
  className?: string
}

export default function ScrollVideo({ src, className = '' }: ScrollVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    let hls: Hls | null = null
    let currentTarget = 0
    let seekPending = false

    const doSeek = () => {
      if (!video.duration || Number.isNaN(video.duration)) return
      if (video.seeking) {
        seekPending = true
        return
      }
      seekPending = false
      video.currentTime = currentTarget
    }

    const onSeeked = () => {
      if (seekPending) doSeek()
    }

    const updateBufferProgress = () => {
      if (!video.duration || Number.isNaN(video.duration)) return
      const buffered = video.buffered
      if (buffered.length === 0) return
      const bufferedEnd = buffered.end(buffered.length - 1)
      setProgress(Math.min(100, Math.round((bufferedEnd / video.duration) * 100)))
    }

    const dismissLoading = () => {
      updateBufferProgress()
      setLoading(false)
    }

    const onCanPlay = () => dismissLoading()

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('progress', updateBufferProgress)
    video.addEventListener('loadedmetadata', updateBufferProgress)

    const isHls = src.includes('.m3u8')
    if (isHls && Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
      })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        const maxLevel = data.levels.length - 1
        hls!.currentLevel = maxLevel
        hls!.startLevel = maxLevel
      })
      hls.on(Hls.Events.FRAG_BUFFERED, updateBufferProgress)
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return
        hls?.destroy()
        hls = null
        video.removeAttribute('src')
        video.load()
      })
    } else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else {
      video.src = src
    }

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      dismissLoading()
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (!video.duration || Number.isNaN(video.duration)) return
        currentTarget = self.progress * video.duration
        if (!video.seeking) doSeek()
      },
    })

    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const moveX = (e.clientX / w) * 2 - 1
      const moveY = (e.clientY / h) * 2 - 1
      gsap.to(wrapper, {
        x: moveX * -30,
        y: moveY * -30,
        duration: 1.5,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('progress', updateBufferProgress)
      video.removeEventListener('loadedmetadata', updateBufferProgress)
      scrollTrigger.kill()
      hls?.destroy()
    }
  }, [src])

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <p className="font-sans text-2xl text-white">Loading... {progress}%</p>
        </div>
      )}
      <div
        ref={wrapperRef}
        className={`fixed top-0 left-0 z-0 h-full w-full origin-center scale-[1.05] ${className}`}
      >
        <video
          ref={videoRef}
          className="h-full w-full scale-[1.35] object-cover"
          muted
          playsInline
          crossOrigin="anonymous"
          preload="auto"
        />
      </div>
    </>
  )
}