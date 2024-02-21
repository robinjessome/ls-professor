import { createClient } from '@/prismicio'
import type { Content } from '@prismicio/client'

import Link from "next/link"
import { MainMenu } from '@/components'


export default async function Header() {

  const client = createClient()
  const settings = await client.getSingle<Content.SiteSettingsDocument>('site_settings');
  const { site_name, main_menu } = settings.data

  return (
    <header className="container px-4 md:p-0 text-3xl my-2 md:mb-0 md:mt-4 flex items-center md:justify-start justify-between gap-6 w-full">
      {site_name && (
        <div>
          <Link href='/' className="font-extrabold tracking-wide uppercase hover:text-primary-500 transition-colors">{site_name}</Link>
        </div>
      )}
      
      
      {main_menu.length > 0 && (
         <MainMenu menu={main_menu} />
      )}
    </header>
  )
}