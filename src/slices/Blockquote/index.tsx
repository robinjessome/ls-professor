import { isFilled, Content } from '@prismicio/client'
import { SliceComponentProps, PrismicRichText, PrismicText } from '@prismicio/react'

import clsx from 'clsx'

/**
 * Props for `Blockquote`.
 */
export type BlockquoteProps = SliceComponentProps<Content.BlockquoteSlice>;

/**
 * Component for "Blockquote" Slices.
 */
const Blockquote = ({ slice }: BlockquoteProps): JSX.Element => {
  if (!isFilled.richText(slice.primary.quote_text)) return <></>

  return (
    <aside
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-content md:pl-content"
    >
      <blockquote
        className="my-8 bg-grey-50 border-l-8 shadow border-primary-500 pl-8 pr-6 py-6 text-grey-900"
      >
        <p className={clsx(
          'text-2xl font-bold leading-tight',
        )}>
          <PrismicText field={slice.primary.quote_text} />
        </p>
        <footer className="mt-2">
          {isFilled.keyText(slice.primary.citation) && (
            <cite className="block font-bold not-italic text-grey-800">
              {slice.primary.citation}
            </cite>
          )}
          {isFilled.keyText(slice.primary.fine_print) && (
            <span className="text-sm leading-none block text-grey-600">{slice.primary.fine_print}</span>
          )}
        </footer>
      </blockquote>
    </aside>
  )
}

export default Blockquote
