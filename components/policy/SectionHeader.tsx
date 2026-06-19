

interface SectionHeaderProps {
    title: string,
    subtitle?: string,
    badge?: React.ReactNode
}

export function SectionHeader({title, subtitle, badge}: SectionHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4 mb-5">
            <div>
                <h3 className="text-lg font-bold text-stone-900" style={{fontFamily: " 'Playfair Display', serif"}}>{title}</h3>
                {subtitle && (
                    <p className="text-sm text-stone-500 mt-1 leading-relaxed">{subtitle}</p>
                )}
            </div>
            {badge && <div className="shrink-0">{badge}</div>}
        </div>
    )
}