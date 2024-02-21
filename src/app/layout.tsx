import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "@/prismicio"
import { Metadata } from 'next'
import { Header, Footer } from './components'

import { Heebo } from 'next/font/google'

const sans = Heebo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Adam Sneyd',
    default: 'Adam Sneyd',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    
    <html lang="en" className={`${sans.variable}`}>
      <body className="bg-gradient-to-br from-primary-400 to-primary-900 antialiased font-sans text-grey-600 min-h-screen">
        <main className="container">
          <Header />
          <div className="bg-white md:mb-12 pb-0 rounded shadow-xl overflow-hidden">
            {children}
            <Footer />
          </div>
        </main>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
