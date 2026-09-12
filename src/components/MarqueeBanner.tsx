const MARQUEE_TEXT = 'New! 3D^OS V1.2.1 out now!'
const ITEMS = Array.from({ length: 6 }, () => MARQUEE_TEXT)

export function MarqueeBanner() {
  const track = [...ITEMS, ...ITEMS]

  return (
    <section className="overflow-hidden bg-[#A6A4FF] py-[14px]">
      <div className="flex w-max animate-marquee gap-[60px] whitespace-nowrap">
        {track.map((text, index) => (
          <span key={index} className="shrink-0 text-base font-medium text-black">
            {text}
          </span>
        ))}
      </div>
    </section>
  )
}
