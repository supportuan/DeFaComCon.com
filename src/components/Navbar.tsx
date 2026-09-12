import { CartIcon } from './CartIcon'

const navColumns = [
  [
    { label: 'Reels', href: '#reels' },
    { label: 'Services', href: '#services' },
  ],
  [
    { label: 'Projects', href: '#projects' },
    { label: 'Pipeline', href: '#pipeline' },
  ],
  [
    { label: 'Careers', href: '#careers' },
    { label: 'Get In Touch', href: '#contact' },
  ],
]

export function Navbar() {
  return (
    <header className="bg-black px-[36px] pb-5 pt-8">
      <nav className="relative mx-auto flex max-w-[1440px] items-start justify-between">
        <a href="/" className="shrink-0">
          <img
            src="/logo.svg"
            alt="Framelix 3D"
            className="h-9 brightness-0 invert"
          />
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-start gap-16 md:flex">
          {navColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-2">
              {column.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <CartIcon count={0} />
      </nav>
    </header>
  )
}
