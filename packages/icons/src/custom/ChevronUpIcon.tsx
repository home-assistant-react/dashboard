import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const ChevronUpIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g fill="none">
      <path
        d="M18 15L12 9L6 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(ChevronUpIcon);
export { ForwardRef as ChevronUpIcon };
