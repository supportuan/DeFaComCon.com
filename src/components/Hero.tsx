import { motion } from 'framer-motion'
import { FramelixBrand } from './FramelixBrand'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260223_060517_9feec9ab-18e4-477a-b034-de5903a67e91.mp4'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <video
        className="h-auto w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <motion.div
        className="absolute left-1/2 top-[50px] z-10 flex -translate-x-1/2 flex-col items-center text-center text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <FramelixBrand />
        <h1 className="mt-3 text-[clamp(2rem,5vw,68px)] font-medium leading-tight tracking-tight">
          Cinematic Motion Studios
        </h1>
      </motion.div>

      <motion.div
        className="absolute bottom-[12%] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <a
          href="#reels"
          className="rounded-full bg-white px-14 py-4 text-[22px] font-medium text-black transition-opacity hover:opacity-90"
        >
          Explore Reel
        </a>
        <p className="mt-4 text-sm text-white/60">Ready in 24-48 hours</p>
      </motion.div>
    </section>
  )
}
