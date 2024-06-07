import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const WHumidity = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    ref={ref}
    {...props}
  >
    <path
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M32 17c-6.09 9-10 14.62-10 20.09a10 10 0 0 0 20 0C42 31.62 38.09 26 32 17z"
    >
      <animateTransform
        attributeName="transform"
        calcMode="spline"
        dur="5s"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
        repeatCount="indefinite"
        type="scale"
        values="1 1; 1 .9; 1 1"
      />
    </path>
  </svg>
);
const ForwardRef = forwardRef(WHumidity);
export { ForwardRef as WHumidity };
