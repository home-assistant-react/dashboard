import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const CheckIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(CheckIcon);
export { ForwardRef as CheckIcon };
