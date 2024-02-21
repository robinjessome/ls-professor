import { type Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps, PrismicRichText, PrismicText } from '@prismicio/react'
import clsx from 'clsx'

import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

import { Button, Icon } from '@/components'

/**
 * Props for `FullWidthCallout`.
 */
export type FullWidthCalloutProps =
  SliceComponentProps<Content.FullWidthCalloutSlice>

/**
 * Component for "FullWidthCallout" Slices.
 */
const FullWidthCallout = ({ slice }: FullWidthCalloutProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        'min-h-[400px] mb-12 lg:mb-0',
        'relative p-content lg:py-32 xl:py-40',
        slice.primary.textColour === "Light" && 'lg:text-white',
      )}
    >
      {isFilled.image(slice.primary.image) && (
        <PrismicNextImage fallbackAlt="" field={slice.primary.image} width={2000} fill={true} className="hidden lg:block object-cover" />
      )}

      <span className={clsx(
          'hidden lg:block h-full w-full absolute left-0 top-0 bg-gradient-to-b',
          slice.variation === "default" ? 'lg:bg-gradient-to-r' : 'lg:bg-gradient-to-l lg:text-right',
          slice.primary.textColour === "Light" ? 
          'from-grey-950/95 to-primary-950/50 lg:via-primary-950/50 lg:to-transparent text-white' :
          'from-primary-50/80 via-primary-50/50',
        )} 
        aria-hidden="true" 
      />
      
      {/* className="border border-grey-300 lg:border-0" */}
      <div className={
        clsx(
          'lg:flex items-center',
          slice.variation === 'imageLeft' && 'justify-end lg:text-right'
        )
      }>
        <PrismicNextImage fallbackAlt="" field={slice.primary.image.mobile} width={800} fill={false} className="block lg:hidden" />
          <div className={clsx(
            'relative z-10 lg:w-1/2',
            'mt-8',
            // 'p-8 lg:p-0'
          )}>
            {isFilled.keyText(slice.primary.eyebrowHeadline) && (
              <span className="text-xs uppercase font-bold tracking-widest mb-1 block">
                {slice.primary.eyebrowHeadline}
              </span>
            )}
            {isFilled.richText(slice.primary.title) && (
                <h2 className="text-3xl lg:text-4xl">
                  <PrismicText field={slice.primary.title} />
                </h2>
            )}
            {isFilled.richText(slice.primary.description) && (
              <div className={clsx(
                'prose mt-4 max-w-none',
                slice.primary.textColour === "Light" && 'lg:text-white prose-light'
            )}>
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
            {isFilled.link(slice.primary.callToActionLink) && (
              <div className="mt-6">
                <Button field={slice.primary.callToActionLink} type={slice.primary.callToActionStyle} size="md">
                  {slice.primary.callToActionLabel || "Learn more…"}
                  <Icon icon={faArrowRightLong} className="w-4 h-4 -translate-y-px" />
                </Button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default FullWidthCallout;
