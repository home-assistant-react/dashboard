import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W02d = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-cloud-2{0%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(2px,0);-moz-transform:translate(2px,0);-ms-transform:translate(2px,0);transform:translate(2px,0)}}@keyframes am-weather-sun{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes am-weather-sun-shiny{0%,to{stroke-dasharray:3px 10px;stroke-dashoffset:0}50%{stroke-dasharray:.1px 10px;stroke-dashoffset:-1px}}.am-weather-sun-shiny line{-webkit-animation-name:am-weather-sun-shiny;-moz-animation-name:am-weather-sun-shiny;-ms-animation-name:am-weather-sun-shiny;animation-name:am-weather-sun-shiny;-webkit-animation-duration:2s;-moz-animation-duration:2s;-ms-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}"
        }
      </style>
    </defs>
    <g id="cloudy-day-3" filter="url(#blur)">
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
            fill="none"
            stroke="orange"
            strokeLinecap="round"
            strokeWidth={2}
            d="M0 9v3M-6.364 6.364l-2.121 2.121M-9 0h-3M-6.364-6.364l-2.121-2.121M0-9v-3M6.364-6.364l2.121-2.121M9 0h3M6.364 6.364l2.121 2.121"
          />
        </g>
        <circle r={5} fill="orange" stroke="orange" strokeWidth={2} />
      </g>
      <path
        fill="#57A0EE"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
        style={{
          WebkitAnimationName: "am-weather-cloud-2",
          MozAnimationName: "am-weather-cloud-2",
          animationName: "am-weather-cloud-2",
          WebkitAnimationDuration: "3s",
          MozAnimationDuration: "3s",
          animationDuration: "3s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: "infinite",
          MozAnimationIterationCount: "infinite",
          animationIterationCount: "infinite",
        }}
        transform="translate(0 -1)"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(W02d);
export { ForwardRef as W02d };
