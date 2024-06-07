import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const ChevronDownIcon = (
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
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(ChevronDownIcon);
export { ForwardRef as ChevronDownIcon };
