import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

type IconProps = {
  icon: any
  className?: string
  pull?: 'up' | 'down',
}

export default function Icon({ icon, pull, className }: IconProps) {

  if (!icon) return null

  return (
    <span className={clsx(
      'inline-block',
      className ? className : 'w-4 h-4',
      pull === 'up' && '-translate-y-px',
      pull === 'down' && 'translate-y-px'
    )}>
      <FontAwesomeIcon icon={icon} className="w-full" />
    </span>
  )
}
