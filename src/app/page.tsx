import { Metadata } from "next"
import Link from "next/link"
import {type Content, filter } from '@prismicio/client'
import { PrismicLink, SliceZone } from "@prismicio/react"
import { createClient } from "@/prismicio"

import { components } from "@/slices"

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import { HeroCarousel, LatestNews, Icon } from "@/components"

/**
 * This component renders your homepage.
 *
 * Use Next's generateMetadata function to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getSingle<Content.HomePageDocument>('home_page');
  return {
    title: home.data.meta_title || undefined,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      // images: [
      //   {
      //     // url: home.data.meta_image.url || "",
      //   },
      // ],
    },
  };
}

export default async function Index() {

  /**
   * The client queries content from the Prismic API
   */
  const client = createClient()
  const home = await client.getSingle<Content.HomePageDocument>('home_page', {
    fetchLinks: 'books.title, books.description, books.featured_image, research.title, research.description, research.featured_image'
  })
  const heroCarousel = home.data.hero_carousel
  const additionalNewsItems = home.data.additional_news_items
  const now = new Date()

  // let tomorrow = new Date(now);
  // tomorrow.setDate(now.getDate() + 1);

  const news = await client.getAllByType('news', {
    limit: 8,
    orderings: {
      field: 'my.news.publish_date',
      direction: 'desc'
    },
    filters: [
      filter.dateBefore( 'my.news.publish_date', now )
    ],
    fetch: 'news.title, news.description, news.featured_image, news.publish_date'
  })

  // const books = await client.getAllByType('books', {
  //   limit: 4,
  //   fetch: 'books.title, books.description, books.featured_image'
  // })
  // const research = await client.getAllByType('research', {
  //   limit: 4,
  //   fetch: 'research.title, research.description, research.featured_image'
  // })

  // const latestWorks = [...books, ...research]
  // latestWorks.sort((a, b): any => {
  //   const dateA = new Date(a.last_publication_date).getTime()
  //   const dateB = new Date(b.last_publication_date).getTime()
  //   return dateB - dateA
  // })

  return (
    <>
      <HeroCarousel slides={heroCarousel} className="" />
      {home.data.show_latest_news && (
        <section className="p-content">
          {home.data.latest_news_title && (
            <div className="flex mt-12 items-center justify-between">
              <h2 className="text-center text-4xl font-bold">{home.data.latest_news_title}</h2>
              <Link href="/news" className="text-grey-600 hover:text-primary-500 transition">
                All News
                <Icon icon={faArrowRightLong} className="ml-2" />
              </Link>
            </div>
          )}
          <LatestNews news={news} additionalNewsItems={additionalNewsItems} className="mb-6" />
        </section>
      )} 
      {/* {home.data.show_latest_works && (
        <section className="p-content">
          {home.data.latest_works_title && (
            <h2 className="text-center text-4xl mt-12 font-bold">{home.data.latest_works_title}</h2>
          )}
          <LatestWorks works={latestWorks} className="mb-12" />
        </section>
      )}  */}
      <div className="homePageSlices">
        <SliceZone slices={home.data.slices} components={components} />
      </div>
    </>
  )
}
