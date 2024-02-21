import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, PrismicText, PrismicRichTextProps } from '@prismicio/react'
import clsx from 'clsx'

type PageHeaderProps = {
  image?: any
  description?: any
  title: any // why not PrismicRichTextProps??
  textColor?: string
  className?: string
}

export default async function PageHeader({ title, description, image, textColor, className }: PageHeaderProps) {

  if (!title) return null

  return (
    <header className={clsx(
      'p-content relative py-12 flex items-end',
      image ? 'h-[450px]' : 'py-12 border-b border-grey-200',
      className
    )}>
    <div className={clsx(
        'relative z-10 max-w-xl',
        textColor === "Light" ? 'text-white' : 'text-grey-950'
      )}
    >
      {isFilled.richText(title) && (
        <h1 className={clsx(
          'text-5xl font-bold leading-tight',
        )}>
          <PrismicText field={title} />
        </h1>
      )}
      {isFilled.richText(description) && (
        <div className={clsx(
          'mt-4 ',
        )}>
          <PrismicRichText field={description} />
        </div>
      )}
    </div>
      {isFilled.image(image) && (
        <>
          <span className={clsx(
              'block h-full w-full absolute left-0 top-0 z-[5] bg-gradient-to-t lg:bg-gradient-to-r',
              textColor === "Light" ? 'from-grey-950/95 to-primary-950/50 lg:via-primary-950/50 lg:to-transparent text-white' : 'from-primary-50/80 via-primary-50/50'
              // textColor === "Dark" ? 
              // 'from-grey-950/95 to-primary-950/50 lg:via-primary-950/50 lg:to-transparent text-white' :
              // 'from-primary-50/80 via-primary-50/50',
            )} 
            aria-hidden="true" 
          />
          <PrismicNextImage fallbackAlt="" field={image} width={2400} fill={true} className="block object-cover" />
        </>
      )}
    </header>
  )
}
