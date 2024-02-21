'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicText, PrismicRichText, PrismicLink } from '@prismicio/react'

import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@/components'

import clsx from 'clsx'

type LatestNewsProps = {
  news: Content.NewsDocument<string>[]    
  additionalNewsItems: any
  // additionalNewsItems: Content.HomePageDocumentDataAdditionalNewsItemsItem[]
  className?: string
}


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const itemTypes: any = {
  books: 'Book',
  research: 'Research',
  news: 'News'
}

const extraItemsPlacement: any = {
  1: 0,
  3: 1,
  5: 2
}

let extraItemIndex = -1;

export default function LatestNews({ news, additionalNewsItems, className } : LatestNewsProps) {

  return (
    <div className={className}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true }}
        loop={false}
        breakpoints={
          {
            // 640: {
            //   slidesPerView: 2,
            //   slidesPerGroup: 2,
            // },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }
        }
      >
        {news.map((newsItem, index) => {
          const showAdditional = [1, 3].includes(index)
          const additionalItem = additionalNewsItems[extraItemsPlacement[index]]?.item
          // if (showAdditional) {
          //   extraItemIndex++
          //   console.log('extraItemIndex', extraItemIndex, index)
          //   console.log('item', additionalNewsItems[extraItemIndex]?.item)
          // }
          return (
            <>
              <SwiperSlide key={newsItem.id} className='!h-auto mt-6 mb-12'>
                <InnerSlide item={newsItem} />
              </SwiperSlide>
              {/* shows an additional item */}
              { showAdditional && (
                <SwiperSlide key={additionalItem.id} className='!h-auto  mt-6 mb-12'>
                  <InnerSlide item={additionalItem} />
                </SwiperSlide>
              )}
            </>
          )
        })}
      </Swiper>
    </div>
  )
}


function InnerSlide({ item }: any) {
  // || item.first_publication_date
  const newsDate = item.data.publish_date
  return (
    <PrismicLink href={item.url || ''} 
      className={clsx(
        'group block relative h-full rounded overflow-hidden',
        // 'bg-black/20',
        'before:bg-gradient-to-t before:from-black/80 before:h-full before:w-full before:block before:absolute before:z-20 before:bottom-0',
        'hover:before:h-[150%] before:transition-all before:duration-300',
        'shadow-lg'
      )}
    >
      {isFilled.image(item.data.featured_image) && (
        <PrismicNextImage alt="" field={item.data.featured_image['Card']} className="relative z-10"  priority/>
      )}

      <div className="absolute bottom-0 p-4 z-20 text-white">
        <span className="inline-flex gap-2 text-xs font-bold tracking-wide uppercase opacity-60">
          {item.type && itemTypes[item.type]}
          {item.type === 'news' && (
            <>
              <Icon icon={faCircle} className="w-1 h-1" />
              <span className="font-medium normal-case">
                {new Date(newsDate).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }
                )}
              </span>
            </>
          
          )}
        </span>
        {isFilled.richText(item.data.title) && (
          <h3 className={clsx(
            'text-3xl font-bold',
          )}>
            <PrismicText field={item.data.title} />
          </h3>
        )} 
        {isFilled.richText(item.data.description) && (
          <div className={clsx(
            'max-h-[0] overflow-hidden transition-all duration-200 line-clamp-4',
            'group-hover:max-h-[100px] group-hover:overflow-y-auto',
            'group-focus:max-h-[100px] group-focus:overflow-y-auto'
          )}>
            <PrismicText field={item.data.description} />
          </div>
        )}  
      </div>
    </PrismicLink>

  )
}