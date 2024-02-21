import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import React from "react";

type Props = {
  field: any
  children: React.ReactNode
  type: keyof typeof typeClasses
  size?: keyof typeof sizeClasses
  className?: string
}

const typeClasses = {
  'Primary - solid': 'text-white bg-primary-500 hover:bg-primary-700 focus:bg-primary-700',
  'Primary - outline': 'bg-primary-50/20 text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white',
  'Secondary - solid': 'text-white bg-secondary-500 hover:bg-secondary-700 focus:bg-primary-700',
  'Secondary - outline': 'bg-secondary-50/20 text-primary-500 border border-secondary-500 hover:bg-secondary-500 hover:text-white focus:bg-secondary-500 focus:text-white',
  'Subtle': 'border border-grey-300/50 hover:bg-primary-50/40 focus:bg-primary-50/40',
  'White': 'text-primary-500 bg-white hover:bg-white/20 focus:bg-white/20 hover:text-white focus:text-white',
}
const sizeClasses = {
  sm: 'text-sm px-4 pt-1.5 pb-1',
  md: 'text-base px-6 pt-2.5 pb-2',
  lg: 'text-xl px-8 pt-3.5 pb-3',
}
export default async function Button({field, children, type = 'Primary - solid', size="md", className}: Props) {
  if (!field) return null

  return (
    <PrismicNextLink 
      field={field} 
      className={clsx(
        'inline-flex justify-between gap-3 leading-0',
        'transition uppercase tracking-wider rounded font-bold',
        sizeClasses[size],
        typeClasses[type]
      )}
    >
      {children}
    </PrismicNextLink>
  )
}
