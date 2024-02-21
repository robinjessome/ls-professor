import { type Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps, PrismicRichText, PrismicText } from '@prismicio/react'
import clsx from 'clsx'

import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

import { Button, Icon } from '@/components'

/**
 * Props for `CalloutBlock`.
 */
export type CalloutBlockProps = SliceComponentProps<Content.CalloutBlockSlice>;

/**
 * Component for "CalloutBlock" Slices.
 */
const CalloutBlock = ({ slice }: CalloutBlockProps): JSX.Element => {

  const variants: any = {
    'Primary - Dark': {
      sectionColours: 'bg-gradient-to-br from-primary-500 to-primary-900 text-white',
      richTextColor: 'prose-light text-white',
      eyebrowColour: 'text-primary-300',
      shadow: 'shadow-xl',
      buttonType: 'White'
    },
    'Primary - Light': {
      sectionColours : 'bg-primary-100',
      richTextColor: '',
      eyebrowColour: 'text-primary-500',
      shadow: 'border border-primary-200',
      buttonType: 'Primary - solid'
    },
    'Secondary - Dark': {
      sectionColours : 'bg-gradient-to-br from-secondary-600 to-secondary-900 text-white',
      richTextColor: 'prose-light text-white',
      eyebrowColour: 'text-grey-500',
      shadow: 'shadow-xl',
      buttonType: 'Primary - solid'
    },
    'Secondary - Light': {
      sectionColours : 'bg-secondary-50',
      richTextColor: '',
      eyebrowColour: 'text-primary-500',
      shadow: 'shadow',
      buttonType: 'Primary - solid'

    },
    'Grey - Light': {
      sectionColours : 'bg-grey-100',
      richTextColor: '',
      eyebrowColour: 'text-primary-500',
      shadow: 'shadow',
      buttonType: 'Primary - solid'

    },
    'None': {
      sectionColours: '',
      richTextColor: '',
      eyebrowColour: 'text-primary-500',
      shadow: 'shadow',
      buttonType: 'Primary - solid'

    }
  }

  // slice.variation

  const hasImage = isFilled.image(slice.primary.image)
  const fullWidth = slice.primary.fullWidth || false

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={
        clsx(
          !fullWidth && 'p-content',
        
        )
      }
    >
        <div className={clsx(
          'flex',
          // items-stretch?
          hasImage ? `justify-between ${fullWidth ? 'items-center' : 'items-center p-16'}` : 'p-16 items-center justify-center',
          slice.variation === "imageRight"
            ? "flex-col md:flex-row-reverse"
            : "flex-col md:flex-row",
          fullWidth ? 'w-full' : `p-content my-12 gap-12 rounded ${variants[slice.primary.backgroundColour || 'None'].shadow}`,
          variants[slice.primary.backgroundColour || 'None'].sectionColours
        )}>

          {hasImage && (
            <div className="w-full h-auto relative">
              <PrismicNextImage
                  fallbackAlt=""
                  field={slice.primary.image}
                  width={800}
                  className={clsx(
                    // 'hidden lg:block',
                    !fullWidth && 'rounded'
                  )}
                />
            </div>
          )}
        

          <div className={clsx(
            'shrink-0 grow-0 flex flex-col justify-center gap-4',
            hasImage 
              ? `w-full lg:w-1/2 ${fullWidth && 'p-12 lg:px-16'}`
              : 'max-w-2xl text-center',
          )}>
            {isFilled.keyText(slice.primary.eyebrowHeadline) && (
              <span className={clsx(
                'text-xs uppercase font-bold tracking-widest mb-2 block',
                variants[slice.primary.backgroundColour || 'None'].eyebrowColour
              )}>
                {slice.primary.eyebrowHeadline}
              </span>
            )}
            {isFilled.richText(slice.primary.title) && (
                <h2 className="text-4xl">
                  <PrismicText field={slice.primary.title} />
                </h2>
            )}
            {isFilled.richText(slice.primary.description) && (
              <div className={clsx(
                'prose max-w-none',
                variants[slice.primary.backgroundColour || 'None'].richTextColor,
              )}>
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
            {isFilled.link(slice.primary.callToActionLink) && (
                <div className="mt-6">
                  <Button 
                    field={slice.primary.callToActionLink}
                    type={variants[slice.primary.backgroundColour || 'None'].buttonType} 
                    size="md"
                  >
                    {slice.primary.callToActionLabel || "Learn more…"}
                    <Icon icon={faArrowRightLong} className="w-4 h-4" pull="up" />
                  </Button>
                </div>
              )}
          </div>
        </div>
      </section>
  )
}

export default CalloutBlock
