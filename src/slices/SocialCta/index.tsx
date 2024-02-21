import { Content, isFilled } from '@prismicio/client'
import { createClient } from '@/prismicio'
import { SliceComponentProps, PrismicText } from "@prismicio/react"
import Link from 'next/link'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { Icon } from '@/components'

import clsx from 'clsx'

/**
 * Props for `SocialCta`.
 */
export type SocialCtaProps = SliceComponentProps<Content.SocialCtaSlice>

/**
 * Component for "SocialCta" Slices.
 */
const SocialCta = async ({ slice }: SocialCtaProps): Promise<JSX.Element> => {

  const client = createClient()
  const settings = await client.getSingle<Content.SiteSettingsDocument>('site_settings');
  const { twitter_handle, twitter_url } = settings.data

  return (
    <aside
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-content"
    >
      <div className={clsx(
        'p-8 my-12 text-primary-800 border border-primary-500 bg-primary-100 rounded flex items-center justify-between',
      )}>
        {isFilled.richText(slice.primary.title) && (
            <h2 className="text-2xl">
              <PrismicText field={slice.primary.title} />
            </h2>
          )}
          <ul>
          {twitter_url && (
          <li className="flex items-center">
            <Link href={twitter_url} className="inline-flex gap-2 items-center hover:text-primary-500 focus:text-primary-500 transition">
              <Icon icon={faTwitter} className="w-8 h-8" />
              {twitter_handle && <>@{twitter_handle}</>}
            </Link>
          </li>
        )}
          </ul>
      </div>
    </aside>
  );
};

export default SocialCta;
