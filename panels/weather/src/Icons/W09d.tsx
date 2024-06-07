import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W09d = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-rain{0%{stroke-dashoffset:0}to{stroke-dashoffset:-100}}.am-weather-rain-1{-webkit-animation-name:am-weather-rain;-moz-animation-name:am-weather-rain;-ms-animation-name:am-weather-rain;animation-name:am-weather-rain;-webkit-animation-duration:8s;-moz-animation-duration:8s;-ms-animation-duration:8s;animation-duration:8s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}"
        }
      </style>
    </defs>
    <g id="rainy-6" filter="url(#blur)">
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
        strokeDasharray="4,4"
        strokeLinecap="round"
        strokeWidth={2}
        d="m26.887 46.29-1.39 7.879"
        className="am-weather-rain-1"
      />
      <path
        fill="none"
        stroke="#91C0F8"
        strokeDasharray="4,4"
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
        transform="rotate(10 -241.676 200.666)"
      />
      <path
        fill="none"
        stroke="#91C0F8"
        strokeDasharray="4,4"
        strokeLinecap="round"
        strokeWidth={2}
        d="m34.94 46.695-1.39 7.878"
        className="am-weather-rain-1"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(W09d);
export { ForwardRef as W09d };
