import { type Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicImage, PrismicRichText, PrismicRichTextProps, PrismicText } from '@prismicio/react'
import clsx from 'clsx'

import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@/components'

type PublicationCardProps = {
  item: any // ??
  isNews?: boolean
  className?: string
}

export default async function PublicationCard({ item, isNews = false, className } : PublicationCardProps) {

  return (
    <div className={
      clsx(
        'bg-white shadow-lg',
        'flex flex-col sm:flex-row group transition',
        'hover:shadow-xl focus:shadow-xl',
        className
      )}
    >
      {isFilled.image(item.data.featured_image) && (
        <div className={clsx(
          'sm:h-auto w-full sm:w-1/3 shrink-0 flex items-center relative border-r border-grey-100',
          'before:w-full before:z-10 before:bg-gradient-to-l before:from-black/10 before:h-full before:absolute before:top-0 before:right-0 before',
          'group-hover:before:opacity-0 before:transition-all'
        )}>
          <PrismicNextImage 
            fallbackAlt=""
            fill={isNews}
            field={item.data.featured_image['Card'] || item.data.featured_image} 
            className="object-cover max-h-[500px] sm:max-h-full w-auto relative z-[5] mx-auto p-4 sm:p-0" 
          />
        </div>
      )}
      <div className="p-6 border-t border-grey-100">
        {isNews && isFilled.date(item.data.publish_date) && (
          <span className="text-xs text-grey-600">
            {new Date(item.data.publish_date).toLocaleDateString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                // timeZone: 'America/Toronto',
              }
            )}
          </span>
        )}
        {isFilled.richText(item.data.title) && (
          <h2 className="text-3xl mb-4 font-bold"><PrismicText field={item.data.title} /></h2>
        )}
        {isFilled.richText(item.data.description) && (
          <div className={clsx(
            'prose leading-snug line-clamp-4',
            // isNews ? '' : 'line-clamp-4'
          )}>
            <PrismicRichText field={item.data.description}/>
          </div>
        )}
        <div className={clsx(
          'flex gap-2 mt-4 font-bold uppercase text-primary-500 transition',
          'group-hover:text-primary-800'
        )}>Read Now <Icon pull="up" icon={faArrowRightLong} className="w-4 h-4 group-hover:ml-1 transition-all" /></div>
      </div>
    </div>
  )
}
