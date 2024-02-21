'use client'

import { useState, useEffect, KeyboardEvent, use } from 'react'
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { slugify } from "@/app/utils"

import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@/components'

export default function MainMenu({ menu }: any) {
  const currentPath = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [currentPath])

  useEffect(() => {

    const keyDownHandler =(e: any) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false)
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', keyDownHandler);
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };

  }, [isOpen])

  if (!menu) return null

  return (
    <>
      <button className="block md:hidden" onClick={toggleMenu}>
        <Icon icon={faBars} className=" w-6 h-6" />  
      </button>
      <nav className={clsx(
        'menuWrapper relative transition all',
        isOpen ? 'menuOpen translate-x-0' : 'translate-x-full md:translate-x-0',
        )}
        aria-hidden={!isOpen}
      >
        <ul className="text-lg p-2 pt-16 md:p-0 md:flex md:items-center md:text-sm md:gap-4">
          {menu.map((item:any, index:number) => {
            const link: any = item.link
            const isActive = currentPath === link.url
            return (
              <li key={`${slugify(item.label || index.toString())}_${index}`}>
                <PrismicNextLink 
                  className={clsx(
                    'uppercase font-bold h-full block border-y-4 border-y-transparent transition',
                    'text-primary-500 hover:text-primary-950 focus:text-primary-950',
                    'md:text-primary-950 md:hover:text-primary-500 md:focus:text-primary-500',
                    isActive ? 'md:border-b-primary-500' : 'md:border-transparent',
                    'p-4 md:p-0 md:py-3 rounded md:rounded-none',
                    isActive ? 'bg-primary-50 md:bg-transparent' : 'bg-transparent',
                    )}
                    field={item.link} 
                    >
                  {item.label}
                </PrismicNextLink>
              </li>
            )
          })}
        </ul>
        <button className="p-6 md:hidden absolute z-40 top-0 right-0" onClick={toggleMenu}>
          <Icon icon={faClose} className="w-6 h-6" />  
        </button>
      </nav>
      <div 
        onClick={toggleMenu}
        className={clsx(
          'backdrop',
          isOpen ? 'block opacity-100' : 'hidden opacity-0'
        )}
      />
    </>
  )
}
