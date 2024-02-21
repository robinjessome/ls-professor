import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import type { Content } from '@prismicio/client'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { PrismicLink } from '@prismicio/react'

import { PageHeader, PublicationCard } from '@/components'


/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata() {
  const client = createClient()
  const page = await client
    .getSingle<Content.NewsArchiveDocument>('news_archive')
    .catch(() => notFound())

  return {
    title: page.data.meta_title || prismic.asText(page.data.title) || undefined,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || prismic.asText(page.data.title) || undefined,
      images: [
        {
          // url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page() {
  const client = createClient()
  const page = await client
    .getSingle<Content.NewsArchiveDocument>('news_archive')
    .catch(() => notFound())

    const newsItems = await client.getAllByType('news', {
      fetch: 'news.title, news.description, news.featured_image, news.publish_date',
      orderings: {
        field: 'my.news.publish_date',
        direction: 'desc'
      }
    })


  return (
    <>
      <PageHeader 
        image={prismic.isFilled.image(page.data.featured_image) && page.data.featured_image}
        description={prismic.isFilled.richText(page.data.description) && page.data.description } 
        title={prismic.isFilled.richText(page.data.title) && page.data.title}
        textColor={page.data.text_color}
      />

      <SliceZone slices={page.data.slices} components={components} />

      <ul className="grid grid-cols-2 gap-12 p-content my-12">
        {newsItems.map((newsItem, index) => {
          return (
            <li key={newsItem.id} className="col-span-full lg:col-span-1">
              <PrismicLink href={newsItem.url || ''}>
                <PublicationCard item={newsItem} className="h-full" isNews={true} />
              </PrismicLink>
            </li>
          )
        })}
      </ul>
    </>
  )
  // return <SliceZone slices={page.data.slices} components={components} />;
}