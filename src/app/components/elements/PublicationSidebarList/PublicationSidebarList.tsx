import clsx from 'clsx'
import { PrismicLink, PrismicText } from '@prismicio/react'
// import { Icon } from '@/components'
// import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

type PublicationSidebarListProps = {
  items: {}[],
  title: String,
  className?: string
}

export default function PublicationSidebarList({ title = "", items, className } : PublicationSidebarListProps) {
  return (
    <div className={
      clsx(
        'mt-12',
        className
      )}
    >
      {title && <h2 className="font-bold text-2xl pb-2 border-b border-grey-200">{title}</h2>}
      <ul className='mt-6'>
        {items.map((item: any) => (
          <li key={item.url} className="font-bold">
            <PrismicLink href={item.url} className="leading-tight group flex py-2 items-center text-grey-700 text-lg hover:text-primary-500 transition-color">
             <PrismicText field={item.data.title} />
             {/* <Icon icon={faArrowRightLong} className="opacity-0 group-hover:opacity-100 w-4 h-4 transition-all" pull="up" /> */}
            </PrismicLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
