'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicText, PrismicRichText } from '@prismicio/react'
import { Button } from '@/components'

import clsx from 'clsx'

type HeroCarouselProps = {
  slides: Content.HomePageDocumentDataHeroCarouselItem[]
  className?: string
}

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroCarousel({ slides, className } : HeroCarouselProps) {

  return (
    <div className={
      clsx(
        '',
        className
      )}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => {
          const hasImage = slide.slideImage.url
          const slideStyle = slide.slideStyle

          return (
            <SwiperSlide key={index} className='!h-auto'>
            <div className={clsx(
              'h-full min-h-[500px] py-12 bg-gradient-to-b from-primary-800 to-primary-500',
              'relative flex flex-col md:flex-row items-center',
              hasImage && slideStyle === 'Background Image' ? 'justify-end md:justify-start px-12 md:px-32' : 'justify-center',
              'gap-12 md:px-32 ',
            )}>
               
              <div className={clsx(
                'text-white shrink-0 relative z-30 max-w-2xl',
                !hasImage ? 
                  'text-center w-full' : 
                  `text-center w-full md:text-left
                    ${slideStyle === 'Background Image' ? 'md:w-3/4 lg:w-3/5' : 'md:w-2/3 lg:w-3/5'}
                  `
              )}>
                {isFilled.richText(slide.slideTitle) && (
                  <h2 className={clsx(
                    'text-3xl font-bold mb-4',
                    'px-8 md:px-0'
                  )}>
                    <PrismicText field={slide.slideTitle} />
                  </h2>
                )}

                {isFilled.richText(slide.slideDescription) && (
                  <div className={clsx(
                    'carouselDescription block',
                    'px-8 md:px-0'
                  )}>
                    <PrismicRichText field={slide.slideDescription} />
                  </div>
                )}
                {isFilled.link(slide.callToActionLink) && (
                  <div className="mt-6">
                    <Button field={slide.callToActionLink} type="White">
                      {slide.callToActionLabel || "Learn more…"}
                    </Button>
                  </div>
                )}
              </div>

              {slideStyle === 'Background Image' && hasImage && (
                <>
                  <span className="block absolute top-0 left-0 z-20 w-full h-full bg-gradient-to-t md:bg-gradient-to-r from-primary-900/80 to-primary-800/20" />
                  <PrismicNextImage priority alt="" field={slide.slideImage} width={2000} fill={true} className="hidden md:block object-cover object-right z-10" />
                  <PrismicNextImage priority alt="" field={slide.slideImage} width={800} fill={true} className="block md:hidden object-cover object-right z-10" />
                </>
              )}

              {slideStyle === 'Contained' && hasImage && (
                <div className="md:w-1/3 lg:w-2/5">
                  <PrismicNextImage fallbackAlt="" priority field={slide.slideImage} height={600} className="h-auto shadow-xl rounded-sm w-auto max-h-[600px] hidden md:block" /> 
                  <PrismicNextImage fallbackAlt=""priority field={slide.slideImage.mobile} height={200} className="h-auto shadow-xl rounded-sm w-auto max-h-[200px] block md:hidden" /> 

                </div>
              )}

            </div>
          </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
