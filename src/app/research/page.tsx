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
    .getSingle<Content.ResearchArchiveDocument>('research_archive')
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
    .getSingle<Content.ResearchArchiveDocument>('research_archive')
    .catch(() => notFound())

    const publications = await client.getAllByType('research', {
      fetch: 'research.title, research.description, research.featured_image',
      orderings: {
        field: 'document.first_publication_date',
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
        {publications.map((publication, index) => {
          return (
            <li key={publication.id} className="col-span-full lg:col-span-1">
              <PrismicLink href={publication.url || ''}>
                <PublicationCard item={publication} className="h-full" />
              </PrismicLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}