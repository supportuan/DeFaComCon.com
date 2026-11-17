import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollFloat.css'

gsap.registerPlugin(ScrollTrigger)

type ScrollFloatProps = {
  children: string
}

function splitTextToNodes(text: string): ReactNode[] {
  const lines = text.split('\n')
  return lines.map((line, lineIndex) => {
    const words = line.split(' ')
    return (
      <span key={lineIndex} style={{ display: 'block' }}>
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className="char">
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 ? '\u00A0' : null}
          </span>
        ))}
      </span>
    )
  })
}

export default function ScrollFloat({ children }: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const chars = root.querySelectorAll('.char')
    const tween = gsap.fromTo(
      chars,
      {
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        transformOrigin: '50% 0%',
      },
      {
        opacity: 0,
        yPercent: 250,
        scaleY: 1.2,
        scaleX: 0.9,
        stagger: 0.05,
        ease: 'power2.inOut',
        duration: 1,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=1000',
          scrub: 1.5,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [children])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-end p-4 md:p-8">
      <h1
        ref={containerRef}
        className="scroll-float-text font-dirtyline text-white"
        style={{
          fontSize: 'clamp(4rem, 15vw, 317px)',
          lineHeight: 0.85,
          letterSpacing: '0%',
        }}
      >
        {splitTextToNodes(children)}
      </h1>
    </div>
  )
}