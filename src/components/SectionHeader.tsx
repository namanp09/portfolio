interface Props {
  eyebrow: string
  heading: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, heading, description, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-heading mt-3">{heading}</h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-muted ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </div>
  )
}
