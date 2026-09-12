import { FramelixBrand } from './FramelixBrand'

const SHIPPING_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260223_063954_03a5f7ec-5f10-4acb-ba8d-dce4815217db.mp4'

export function ShippingSection() {
  return (
    <section className="rounded-b-[40px] bg-[#EAEAEA] pb-32 pt-16 text-black">
      <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
        <FramelixBrand size="sm" className="text-black" />
        <h2 className="mt-3 text-[clamp(2rem,4vw,52px)] font-medium leading-tight tracking-tight">
          Shipping Now
        </h2>

        <div className="-my-24">
          <video
            className="h-[800px] w-[800px] max-w-full rounded-2xl object-contain"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Framelix 3D product preview"
          >
            <source src={SHIPPING_VIDEO} type="video/mp4" />
          </video>
        </div>

        <a
          href="#buy"
          className="rounded-full bg-black px-46 py-3 text-lg font-medium text-white transition-opacity hover:opacity-90"
        >
          Buy Now
        </a>
        <p className="mt-4 text-xl font-[450]">Explore now</p>
      </div>
    </section>
  )
}
