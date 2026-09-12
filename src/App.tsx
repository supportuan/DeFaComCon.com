import { Hero } from './components/Hero'
import { MarqueeBanner } from './components/MarqueeBanner'
import { Navbar } from './components/Navbar'
import { ShippingSection } from './components/ShippingSection'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <ShippingSection />
      </main>
    </div>
  )
}

export default App
