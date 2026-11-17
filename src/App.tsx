import { useRef } from 'react'
import ScrollVideo from './components/ScrollVideo'
import ScrollFloat from './components/ScrollFloat'
import GlassPanel from './components/GlassPanel'
import PillNav from './components/PillNav'

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ScrollVideo src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260709_080129_da34b00e-a5db-47dd-81a1-cccad79ac1ac.mp4" />
      <PillNav aboutSectionRef={aboutSectionRef} />
      <div ref={scrollContainerRef} className="relative" style={{ height: '500vh' }}>
        <ScrollFloat>{`DeFaComCon\n full power`}</ScrollFloat>
        <GlassPanel
          scrollContainerRef={scrollContainerRef}
          aboutSectionRef={aboutSectionRef}
        />
      </div>
    </>
  )
}