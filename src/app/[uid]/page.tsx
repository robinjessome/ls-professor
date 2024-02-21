import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SliceZone } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

import { PageHeader } from '@/components'

type Params = { uid: string };
/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title || prismic.asText(page.data.title) || undefined,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || prismic.asText(page.data.title) || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound())

  return (
    <>
      <PageHeader 
        image={prismic.isFilled.image(page.data.featured_image) && page.data.featured_image}
        description={prismic.isFilled.richText(page.data.description) && page.data.description } 
        title={prismic.isFilled.richText(page.data.title) && page.data.title}
        textColor={page.data.text_colour}
        className="mb-6 md:mb-0"
      />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page")

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid }
  });
}
