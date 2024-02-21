import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import * as prismic from '@prismicio/client'

import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicLink, SliceZone, PrismicRichText, PrismicText, PrismicRichTextProps } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { PublicationSidebarList, Icon, SidebarImage } from '@/components'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient()
  const page: any = await client
    .getByUID("research", params.uid)
    .catch(() => notFound())

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || prismic.asText(page.data.title) || undefined,
      images: [
        {
          url: page.data.featured_image.url || "",
        },
      ],
    },
  }
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page: any = await client
    .getByUID("research", params.uid)
    .catch(() => notFound())
    
    const morePublications = await client.getAllByType('research', {
      filters: [
        prismic.filter.not('my.research.uid', params.uid)
      ],
      fetch: 'research.title'
    })

  return (
    <div className='py-12 md:gap-12 grid grid-cols-12'>
      <div className="col-span-full md:col-span-8">
        <div className="p-content">
            <div className="pb-8 mb-8 border-b border-grey-200">
            <PrismicLink href="/research" className="text-grey-400 hover:text-grey-700 inline-flex justify-between gap-2 transition-colors mb-4">
              <Icon pull="up" icon={faArrowLeftLong} className="w-4 h-4 group-hover:ml-1" />
              Back to Research
            </PrismicLink>
            {prismic.isFilled.richText(page.data.title) && (
              <h1 className={clsx(
                'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
              )}>
                <PrismicText field={page.data.title} />
              </h1>
            )}
            {isFilled.keyText(page.data.sub_title) && (
              <span className="text-3xl mt-2 font-regular leading-snug">
                {page.data.sub_title}
              </span>
            )}
            {/* {isFilled.richText(page.data.description) && (
              <div className="text-3xl mt-2 font-medium leading-snug">
                <PrismicRichText field={page.data.description}/>
              </div>
            )} */}
            </div>

            {isFilled.image(page.data.featured_image) && (
              <div className={clsx(
                'rounded overflow-hidden shadow-lg mb-8',
                'block md:hidden',
              )}>
                <PrismicNextImage fallbackAlt="" field={page.data.featured_image} className="" />
              </div>
            )}
          </div>
        <SliceZone slices={page.data.slices} components={components} />
      </div>
      <div className="col-span-full md:col-span-4 pr-content">
        {isFilled.image(page.data.featured_image) && (
          <SidebarImage image={page.data.featured_image} className="hidden md:block"/>
        )}
        {morePublications.length > 0 && (
          <PublicationSidebarList items={morePublications} title="More Research Publications" />
        )}

      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient()

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("research")

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid }
  })
}
