type FramelixBrandProps = {
  size?: 'sm' | 'md'
  className?: string
}

const sizeMap = {
  sm: { brand: 'text-[20px]', superscript: 'text-[11px]' },
  md: { brand: 'text-[26px]', superscript: 'text-[14px]' },
}

export function FramelixBrand({ size = 'md', className = '' }: FramelixBrandProps) {
  const styles = sizeMap[size]

  return (
    <span className={`inline-flex items-start font-medium leading-none ${className}`}>
      <span className={styles.brand}>Framelix</span>
      <sup className={`${styles.superscript} ml-0.5 -mt-0.5 font-medium`}>3D</sup>
    </span>
  )
}
