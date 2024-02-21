import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from 'clsx'

/**
 * Props for `Spacer`.
 */
export type SpacerProps = SliceComponentProps<Content.SpacerSlice>;

/**
 * Component for "Spacer" Slices.
 */
const Spacer = ({ slice }: SpacerProps): JSX.Element => {

  const variants: any = {
    'Small': {
      height: 'h-8',
    },
    'Medium': {
      height: 'h-16',
    },
    'Large': {
      height: 'h-32',
    },

  }
  return (
    <div aria-hidden={true} className={clsx(
      'w-full',
      variants[slice.primary.height].height
    )}></div>
  );
};

export default Spacer;
