import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BRANDS = ['VOICEFLOW', 'ZENDESK', 'PENDO', 'GLIDE', 'CANVA']

type GlassPanelProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  aboutSectionRef?: RefObject<HTMLDivElement | null>
}

export default function GlassPanel({
  scrollContainerRef,
  aboutSectionRef,
}: GlassPanelProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    const wrapper = wrapperRef.current
    const panel = panelRef.current
    if (!container || !wrapper || !panel) return

    const scrollTween = gsap.fromTo(
      wrapper,
      { y: '100%' },
      {
        y: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      },
    )

    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const moveX = (e.clientX / w) * 2 - 1
      const moveY = (e.clientY / h) * 2 - 1
      gsap.to(panel, {
        x: moveX * 20,
        y: moveY * 20,
        rotationY: moveX * 4,
        rotationX: -moveY * 4,
        ease: 'power3.out',
        duration: 1,
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      scrollTween.scrollTrigger?.kill()
      scrollTween.kill()
    }
  }, [scrollContainerRef])

  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <div
      ref={(node) => {
        sectionRef.current = node
        if (aboutSectionRef) {
          aboutSectionRef.current = node
        }
      }}
      className="absolute bottom-0 left-0 h-screen w-full"
      id="about-section"
    >
      <div className="flex h-full w-full items-end justify-center px-4 pb-4 md:px-8 md:pb-8">
        <div
          ref={wrapperRef}
          className="pointer-events-auto h-[900px] w-full max-w-[1250px] max-h-[85vh]"
          style={{ perspective: '1000px' }}
        >
          <div
            ref={panelRef}
            className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.16)',
              backdropFilter: 'blur(160px)',
              WebkitBackdropFilter: 'blur(160px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center md:px-12">
              <p className="mb-4 font-serif text-base italic text-white/70 md:mb-6 md:text-lg">
                About Us
              </p>
              <h2 className="mx-auto w-full max-w-[1000px] font-serif text-4xl tracking-tight text-white md:text-6xl lg:text-[96px] lg:leading-[92.6px] leading-[1.1]">
                We transform sterile concrete into thriving{' '}
                <span className="italic">urban</span> jungles. Our innovative
                designs bring wild <span className="italic">nature</span> back to
                modern cities. Experience the <span className="italic">bloom</span>
              </h2>
            </div>

            <div className="overflow-hidden border-t border-white/10 py-6">
              <div className="flex w-max animate-marquee gap-16 px-8">
                {marqueeItems.map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="font-sans text-sm font-semibold tracking-widest text-white uppercase opacity-40 transition-opacity duration-300 hover:opacity-100"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}