// sitemap.ts
import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio"
import {type Content } from '@prismicio/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  
  const posts = await Promise.resolve().then(() => [
    { id: "0", date: "2023-05-06" },
  ]);

  const client = createClient();
  const allDocs = await client.dangerouslyGetAll({
    fetch: 'document.last_publication_date, document.type'
  })

  const parents: any = {
    research: '/research',
    books: '/books',
    news: '/news'
  }

  const pageUrls = allDocs.map((page) => {

    const parent = parents[page.type] || ''
    return (
      {
        url: `${BASE_URL}${parent}/${page.uid}`,
        lastModified: new Date(page.last_publication_date),
      }
    )
  })

  // const home = await client.getSingle<Content.HomePageDocument>('home_page',{ fetch: 'document.last_publication_date' })

  // const pages = await client.getAllByType('page',{ fetch: 'document.last_publication_date' })
  // const pageUrls = pages.map((page) => ({
  //   url: `${BASE_URL}/${page.uid}`,
  //   lastModified: new Date(page.last_publication_date),
  // }))

  // const books = await client.getAllByType('books',{ fetch: 'document.last_publication_date' })
  // const bookUrls = books.map((book) => ({
  //   url: `${BASE_URL}/books/${book.uid}`,
  //   lastModified: new Date(book.last_publication_date),
  // }))

  // const research = await client.getAllByType('research',{ fetch: 'document.last_publication_date' })
  // const researchUrls = research.map((researchItem) => ({
  //   url: `${BASE_URL}/${researchItem.uid}`,
  //   lastModified: new Date(researchItem.last_publication_date),
  // }))



  // const postUrls =
  //   posts &&
  //   posts.map((post) => ({
  //     url: `http://example.com/posts/${post.id}`,
  //     lastModified: new Date(post.date),
  //   }));

  // return [...pageUrls, ...bookUrls, ...researchUrls]
  return [
    ...pageUrls
  ]

}


/*
{
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }
*/