import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import * as prismic from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

import { PrismicLink, SliceZone, PrismicText } from '@prismicio/react'

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
  const page = await client
    .getByUID("news", params.uid)
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
  const page = await client
    .getByUID("news", params.uid)
    .catch(() => notFound())

    const moreNews = await client.getAllByType('news', {
      filters: [
        prismic.filter.not('my.news.uid', params.uid)
      ],
      orderings: {
        field: 'my.news.publish_date',
        direction: 'desc'
      },
      fetch: 'news.title'
    })
  return (
    <div className='py-12 md:gap-12 grid grid-cols-12 items-start'>
      <div className="col-span-full md:col-span-8">
        <div className="p-content">
          <div className="pb-6 mb-8 border-b border-grey-200">
          <PrismicLink href="/news" className="text-grey-400 hover:text-grey-700 inline-flex justify-between gap-2 transition-colors mb-4">
            <Icon pull="up" icon={faArrowLeftLong} className="w-4 h-4 group-hover:ml-1" />
            Back to News
          </PrismicLink>
          {prismic.isFilled.richText(page.data.title) && (
            <h1 className={clsx(
              'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
            )}>
              <PrismicText field={page.data.title} />
            </h1>
          )}

          {isFilled.date(page.data.publish_date) && (
            <span className="block mt-4 text-grey-600">
              {new Date(page.data.publish_date).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }
              )}
            </span>
          )}
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
        {moreNews.length > 0 && (
          <PublicationSidebarList items={moreNews} title="More News" />
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
  const pages = await client.getAllByType("books")

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid }
  })
}
