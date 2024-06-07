import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const WVisibility = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    ref={ref}
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1={91.97}
        x2={77.03}
        y1={77.63}
        y2={99.37}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#fff" />
        <stop offset={0.45} stopColor="#fff" />
        <stop offset={1} stopColor="#fff" />
        <animateTransform
          attributeName="gradientTransform"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          values="32 32; 360 32"
        />
      </linearGradient>
    </defs>
    <path
      fill="none"
      stroke="url(#a)"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M43 32a11 11 0 1 1-11-11 11 11 0 0 1 11 11zM25 14.61l-.48 1a33.68 33.68 0 0 0-3.42 17.82h0M39 99.39l.48-1a33.68 393.68 0 0 0 3.42-17.82h0"
    >
      <animateTransform
        attributeName="transform"
        dur="3s"
        repeatCount={999}
        type="rotate"
        values="360 32 32; 0 32 32"
      />
    </path>
  </svg>
);
const ForwardRef = forwardRef(WVisibility);
export { ForwardRef as WVisibility };
