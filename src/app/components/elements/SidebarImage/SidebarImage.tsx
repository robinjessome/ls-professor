import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from '@prismicio/next'

import clsx from "clsx"

export type SidebarImageProps = {
  className?: string,
  image: ImageField
}
export default async function SidebarImage({ className, image } : SidebarImageProps) {

  return (
    <div className={clsx(
      'relative after:w-full after:h-full after:absolute after:top-3 after:left-3 after:bg-primary-200 after:z-0 after:rounded',
      className
    )}>
      <PrismicNextImage fallbackAlt="" field={image} className="rounded relative z-10 shadow-md" />
    </div>
  )
}
