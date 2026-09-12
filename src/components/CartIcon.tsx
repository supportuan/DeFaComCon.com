type CartIconProps = {
  count?: number
}

export function CartIcon({ count = 0 }: CartIconProps) {
  return (
    <button
      type="button"
      aria-label={`Cart with ${count} items`}
      className="relative inline-flex h-[30px] w-[27px] items-center justify-center"
    >
      <svg
        width="27"
        height="30"
        viewBox="0 0 27 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0"
      >
        <path
          d="M4 3H23C24.6569 3 26 4.34315 26 6V24C26 25.6569 24.6569 27 23 27H4C2.34315 27 1 25.6569 1 24V6C1 4.34315 2.34315 3 4 3Z"
          stroke="white"
          strokeWidth="1.2"
        />
        <path
          d="M0 7.5C0 6.67157 0.671573 6 1.5 6H25.5C26.3284 6 27 6.67157 27 7.5V9.5C27 10.3284 26.3284 11 25.5 11H1.5C0.671573 11 0 10.3284 0 9.5V7.5Z"
          fill="black"
          stroke="white"
          strokeWidth="1.2"
        />
        <circle cx="1.5" cy="7.5" r="1.5" fill="black" />
        <circle cx="25.5" cy="7.5" r="1.5" fill="black" />
        <circle cx="1.5" cy="9.5" r="1.5" fill="black" />
        <circle cx="25.5" cy="9.5" r="1.5" fill="black" />
        <path
          d="M3 11H24V23.5C24 25.1569 22.6569 26.5 21 26.5H6C4.34315 26.5 3 25.1569 3 23.5V11Z"
          stroke="white"
          strokeWidth="1.2"
        />
        <path
          d="M6 14.5C6 13.6716 6.67157 13 7.5 13H19.5C20.3284 13 21 13.6716 21 14.5V14.5C21 15.3284 20.3284 16 19.5 16H7.5C6.67157 16 6 15.3284 6 14.5V14.5Z"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.6"
        />
      </svg>
      <span className="relative z-10 pt-0.5 text-[10px] font-medium leading-none text-white">
        {count}
      </span>
    </button>
  )
}
