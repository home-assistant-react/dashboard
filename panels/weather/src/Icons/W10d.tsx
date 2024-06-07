import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W10d = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    ref={ref}
    {...props}
  >
    <defs>
      <filter id="blur" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation={3} />
        <feOffset dy={4} result="offsetblur" />
        <feComponentTransfer>
          <feFuncA slope={0.05} type="linear" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <style>
        {
          "@keyframes am-weather-sun{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes am-weather-rain{0%{stroke-dashoffset:0}to{stroke-dashoffset:-100}}"
        }
      </style>
    </defs>
    <g id="rainy-3" filter="url(#blur)">
      <g transform="translate(20 26)">
        <g
          style={{
            WebkitAnimationName: "am-weather-sun",
            MozAnimationName: "am-weather-sun",
            animationName: "am-weather-sun",
            WebkitAnimationDuration: "9s",
            MozAnimationDuration: "9s",
            animationDuration: "9s",
            WebkitAnimationTimingFunction: "linear",
            MozAnimationTimingFunction: "linear",
            animationTimingFunction: "linear",
            WebkitAnimationIterationCount: "infinite",
            MozAnimationIterationCount: "infinite",
            animationIterationCount: "infinite",
          }}
        >
          <path
            stroke="orange"
            strokeLinecap="round"
            strokeWidth={2}
            d="M0 9v3"
          />
          <path
            fill="none"
            stroke="orange"
            strokeLinecap="round"
            strokeWidth={2}
            d="m-6.364 6.364-2.121 2.121M-9 0h-3M-6.364-6.364l-2.121-2.121M0-9v-3M6.364-6.364l2.121-2.121M9 0h3M6.364 6.364l2.121 2.121"
          />
        </g>
        <circle r={5} fill="orange" stroke="orange" strokeWidth={2} />
      </g>
      <path
        fill="#57A0EE"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M47.7 34.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
      />
      <path
        fill="none"
        stroke="#91C0F8"
        strokeDasharray="4,7"
        strokeLinecap="round"
        strokeWidth={2}
        d="M0 0v8"
        style={{
          WebkitAnimationName: "am-weather-rain",
          MozAnimationName: "am-weather-rain",
          animationName: "am-weather-rain",
          WebkitAnimationDuration: "8s",
          MozAnimationDuration: "8s",
          animationDuration: "8s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: "infinite",
          MozAnimationIterationCount: "infinite",
          animationIterationCount: "infinite",
        }}
        transform="rotate(10 -248.606 182.52)"
      />
      <path
        fill="none"
        stroke="#91C0F8"
        strokeDasharray="4,7"
        strokeLinecap="round"
        strokeWidth={2}
        d="M0 0v8"
        style={{
          WebkitAnimationName: "am-weather-rain",
          MozAnimationName: "am-weather-rain",
          animationName: "am-weather-rain",
          WebkitAnimationDelay: ".25s",
          MozAnimationDelay: ".25s",
          animationDelay: ".25s",
          WebkitAnimationDuration: "8s",
          MozAnimationDuration: "8s",
          animationDuration: "8s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: "infinite",
          MozAnimationIterationCount: "infinite",
          animationIterationCount: "infinite",
        }}
        transform="rotate(10 -240.176 217.81)"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(W10d);
export { ForwardRef as W10d };
