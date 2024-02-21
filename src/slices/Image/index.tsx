import { isFilled, Content } from "@prismicio/client"
import { PrismicImage, PrismicRichText, SliceComponentProps } from "@prismicio/react"

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice>

/**
 * Component for "Image" Slices.
 */
const Image = ({ slice }: ImageProps): JSX.Element => {
  return (
    <div className="p-content md:pl-content">
      <figure
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        >
        <PrismicImage field={slice.primary.image} className="shadow-lg rounded" />
        {isFilled.richText(slice.primary.caption) && (
          <figcaption className="mt-2 text-sm text-grey-600">
            <PrismicRichText field={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </div>
  )
}

export default Image
