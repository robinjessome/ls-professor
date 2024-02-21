'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicText, PrismicRichText, PrismicLink } from '@prismicio/react'

import clsx from 'clsx'

type HeroCarouselProps = {
  works: (Content.BooksDocument<string> | Content.ResearchDocument<string>)[]
  className?: string
}

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroCarousel({ works, className } : HeroCarouselProps) {

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
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }
        }
      >
        {works.map((work, index) => {
          return (
            <SwiperSlide key={work.id} className='!h-auto my-12'>
              <PrismicLink href={work.url || ''} 
                className={clsx(
                  'block relative h-full rounded overflow-hidden',
                  'bg-black/20',
                  'before:bg-gradient-to-t before:from-black/80 before:h-full before:w-full before:block before:absolute before:z-20 before:bottom-0',
                  'hover:before:h-1/2 before:transition-all before:duration-100'
                )}
              >
                {isFilled.image(work.data.featured_image) && (
                  <PrismicNextImage alt="" field={work.data.featured_image} className="relative z-10" />
                )}

                <div className="absolute bottom-0 p-4 z-20 text-white">
                  <span className="text-xs font-bold tracking-wide uppercase opacity-50">
                    {work.type === 'books' ? 'Book' : 'Research'}
                  </span>
                  {isFilled.richText(work.data.title) && (
                    <h3 className={clsx(
                      'text-2xl font-bold',
                    )}>
                      <PrismicText field={work.data.title} />
                    </h3>
                  )}  
                </div>
              </PrismicLink>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
