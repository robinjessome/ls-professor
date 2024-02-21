import { createClient } from "@/prismicio";
import type { Content } from '@prismicio/client'

import Link from 'next/link'

import { Icon } from '@/components'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

// function Separator() {
//   return <span className="mx-2 border-slate-300 border-l h-5" />
// }

export default async function Footer() {

  const client = createClient()
  const settings = await client.getSingle<Content.SiteSettingsDocument>('site_settings')
  const { site_name, copyright_text, email_address, twitter_url, twitter_handle } = settings.data
  const year = new Date().getFullYear()
  
  return (
    <>
      <footer className="container flex items-center justify-between text-sm p-content py-6 bg-primary-400 text-primary-900">
        <p className="flex items-center">&copy; {year}
          {site_name && (
            <>
              &nbsp;{site_name}
            </>
          )}
          {copyright_text && (
            <>
              , {copyright_text}
            </>
          )}
        </p>
        
        <ul className="flex gap-3">
        {email_address && (
          <li className="flex items-center">
            <Link href={`mailto:${email_address}`} className="inline-flex items-center text-primary-300 hover:text-primary-100 focus:text-primary-100">
              <Icon icon={faEnvelope} className="w-4 h-4" />
            </Link>
          </li>
        )}
        {twitter_url && (
          <li className="flex items-center">
            <Link href={twitter_url} className="text-primary-300 hover:text-primary-100 focus:text-primary-100 inline-flex gap-1 items-center">
              <Icon icon={faTwitter} className="w-4 h-4" />
              {/* {twitter_handle && <>@{twitter_handle}</>} */}
            </Link>
          </li>
        )}
        </ul>
      </footer>
    </>
  )
}
