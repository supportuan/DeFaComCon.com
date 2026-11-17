import { useEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './PillNav.css'

gsap.registerPlugin(ScrollToPlugin)

const DESKTOP_MQ = '(min-width: 769px)'

type NavId = 'home' | 'about' | 'services' | 'contact'

const NAV_ITEMS: { id: NavId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'services', label: 'SERVICES' },
  { id: 'contact', label: 'CONTACT' },
]

function LogoIcon() {
  return (
    <svg viewBox="0 0 100 100" width={24} height={24} aria-hidden>
      <path
        fill="#fff"
        d="m50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z"
      />
      <path
        fill="#fff"
        d="m17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z"
      />
      <path
        fill="#fff"
        d="m82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z"
      />
      <path
        fill="#fff"
        d="m17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z"
      />
    </svg>
  )
}

type PillButtonProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

function PillButton({ label, isActive, onClick }: PillButtonProps) {
  return (
    <button
      type="button"
      className={`pill${isActive ? ' is-active' : ''}`}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

type PillNavProps = {
  aboutSectionRef?: RefObject<HTMLDivElement | null>
}

export default function PillNav({ aboutSectionRef }: PillNavProps) {
  const logoRef = useRef<HTMLButtonElement>(null)
  const logoSvgRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const introTweenRef = useRef<gsap.core.Tween | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState<NavId>('home')
  const scrollActiveRef = useRef(true)

  const syncActiveFromScroll = () => {
    if (!scrollActiveRef.current) return
    const about = aboutSectionRef?.current
    if (!about) return
    const top = about.getBoundingClientRect().top
    if (top <= window.innerHeight * 0.55) {
      setActiveId('about')
    } else if (window.scrollY < window.innerHeight * 0.2) {
      setActiveId('home')
    }
  }

  const runDesktopIntro = () => {
    const navEl = navItemsRef.current
    if (!navEl || !window.matchMedia(DESKTOP_MQ).matches) return

    gsap.killTweensOf(navEl)
    gsap.set(navEl, { clearProps: 'width,opacity,transform' })

    introTweenRef.current?.kill()
    introTweenRef.current = gsap.fromTo(
      navEl,
      { opacity: 0, x: -16 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
      },
    )
  }

  useEffect(() => {
    const logo = logoRef.current
    if (logo) {
      gsap.fromTo(logo, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'power3.out' })
    }
    runDesktopIntro()

    const onResize = () => {
      const navEl = navItemsRef.current
      if (!navEl) return
      gsap.set(navEl, { clearProps: 'width,opacity,transform' })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      introTweenRef.current?.kill()
      if (navItemsRef.current) {
        gsap.set(navItemsRef.current, { clearProps: 'all' })
      }
    }
  }, [])

  useEffect(() => {
    syncActiveFromScroll()
    const onScroll = () => syncActiveFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [aboutSectionRef])

  useEffect(() => {
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    if (!line1 || !line2) return

    if (mobileOpen) {
      gsap.to(line1, { rotation: 45, y: 3, duration: 0.3 })
      gsap.to(line2, { rotation: -45, y: -3, duration: 0.3 })
    } else {
      gsap.to(line1, { rotation: 0, y: 0, duration: 0.3 })
      gsap.to(line2, { rotation: 0, y: 0, duration: 0.3 })
    }
  }, [mobileOpen])

  const scrollToTop = () => {
    scrollActiveRef.current = false
    setActiveId('home')
    gsap.to(window, {
      duration: 3,
      scrollTo: 0,
      ease: 'power3.inOut',
      onComplete: () => {
        scrollActiveRef.current = true
        syncActiveFromScroll()
      },
    })
    setMobileOpen(false)
  }

  const scrollToAbout = () => {
    const target = aboutSectionRef?.current
    scrollActiveRef.current = false
    setActiveId('about')
    if (target) {
      gsap.to(window, {
        duration: 3,
        scrollTo: { y: target, offsetY: 0 },
        ease: 'power3.inOut',
        onComplete: () => {
          scrollActiveRef.current = true
          syncActiveFromScroll()
        },
      })
    } else {
      scrollActiveRef.current = true
    }
    setMobileOpen(false)
  }

  const onLogoEnter = () => {
    if (logoSvgRef.current) {
      gsap.to(logoSvgRef.current, { rotation: '+=360', duration: 0.2, ease: 'power2.out' })
    }
  }

  const handleNavClick = (id: NavId) => {
    if (id === 'home') scrollToTop()
    else if (id === 'about') scrollToAbout()
    else {
      setActiveId(id)
      setMobileOpen(false)
    }
  }

  return (
    <div className="pill-nav-container">
      <nav className="pill-nav" aria-label="Main">
        <button
          ref={logoRef}
          type="button"
          className="pill-logo desktop-only"
          onMouseEnter={onLogoEnter}
          onClick={scrollToTop}
          aria-label="Home"
        >
          <div ref={logoSvgRef} className="logo-svg-container">
            <LogoIcon />
          </div>
        </button>

        <div className="desktop-only pill-nav-desktop">
          <div ref={navItemsRef} className="pill-nav-items">
            <ul className="pill-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <PillButton
                    label={item.label}
                    isActive={activeId === item.id}
                    onClick={() => handleNavClick(item.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mobile-only mobile-nav-shell">
          <button
            type="button"
            className="pill-logo mobile-menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="pill-mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="mobile-menu-icon" aria-hidden>
              <span ref={line1Ref} className="hamburger-line" />
              <span ref={line2Ref} className="hamburger-line" />
            </span>
          </button>
          <div
            id="pill-mobile-menu"
            className={`mobile-menu-popover ${mobileOpen ? 'is-open' : ''}`}
            role="dialog"
            aria-label="Navigation menu"
          >
            <ul className="mobile-menu-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`mobile-menu-link${activeId === item.id ? ' is-active' : ''}`}
                    aria-label={item.label}
                    aria-current={activeId === item.id ? 'page' : undefined}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}