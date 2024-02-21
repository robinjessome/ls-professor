import { type Content, isFilled } from '@prismicio/client'
import { SliceComponentProps, PrismicRichText, PrismicText } from '@prismicio/react'
import Link from 'next/link'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { Icon, Button } from '@/components'

import clsx from "clsx"

/**
 * Props for `BannerCta`.
 */
export type BannerCtaProps = SliceComponentProps<Content.BannerCtaSlice>;

/**
 * Component for "BannerCta" Slices.
 */
const BannerCta = ({ slice }: BannerCtaProps): JSX.Element => {

  const variants: any = {
    'Primary - Dark': {
      backgroundColour: 'bg-gradient-to-br from-primary-500 to-primary-900 text-white',
      richTextColor: 'prose-light text-white',
      buttonType: 'White'
    },
    'Primary - Light': {
      backgroundColour : 'bg-primary-100',
      richTextColor: '',
      buttonType: 'Primary - solid'
    },
    'Secondary - Dark': {
      backgroundColour : 'bg-gradient-to-br from-secondary-600 to-secondary-900 text-white',
      richTextColor: 'prose-light text-white',
      buttonType: 'Primary - solid'
    },
    'Secondary - Light': {
      backgroundColour : 'bg-secondary-50',
      richTextColor: '',
      buttonType: 'Primary - solid'

    },
    'Grey - Light': {
      backgroundColour : 'bg-grey-100',
      richTextColor: '',
      buttonType: 'Primary - solid'

    },
    'None': {
      backgroundColour: '',
      richTextColor: '',
      buttonType: 'Primary - solid'

    }
  }

  return (
    <aside
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-content"
    >
      <div className={clsx(
        'p-8 my-12 text-primary-800 border border-primary-500 bg-primary-100 rounded flex flex-col md:flex-row gap-4 items-center shadow-lg justify-between',
      )}>

      {isFilled.richText(slice.primary.text) && (
        <div className='text-lg max-w-md'>
          <PrismicText field={slice.primary.text} />
        </div>
      )}

      {isFilled.link(slice.primary.cta_link) && (
        <Button field={slice.primary.cta_link} type="Primary - solid" size="md">
          <span>{slice.primary.cta_text || "Learn more…"}</span>
          <Icon icon={faArrowRightLong}/>
        </Button>
      )}

{/* <Link href={twitter_url} className="inline-flex gap-1 items-center hover:text-primary-500 focus:text-primary-500 transition">
              <Icon icon={faTwitter} className="w-6 h-6" />
              {twitter_handle && <>@{twitter_handle}</>}
            </Link> */}
      </div>

    </aside>
  );
};

export default BannerCta;
