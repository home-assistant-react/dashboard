import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W11d = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-cloud-1{0%,to{-webkit-transform:translate(-5px,0);-moz-transform:translate(-5px,0);-ms-transform:translate(-5px,0);transform:translate(-5px,0)}50%{-webkit-transform:translate(10px,0);-moz-transform:translate(10px,0);-ms-transform:translate(10px,0);transform:translate(10px,0)}}@keyframes am-weather-cloud-2{0%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(2px,0);-moz-transform:translate(2px,0);-ms-transform:translate(2px,0);transform:translate(2px,0)}}@keyframes am-weather-stroke{0%,12%,16%,20%,24%,28%,4%,8%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}10%,14%,18%,2%{-webkit-transform:translate(.3px,0);-moz-transform:translate(.3px,0);-ms-transform:translate(.3px,0);transform:translate(.3px,0)}6%{-webkit-transform:translate(.5px,.4px);-moz-transform:translate(.5px,.4px);-ms-transform:translate(.5px,.4px);transform:translate(.5px,.4px)}22%{-webkit-transform:translate(1px,0);-moz-transform:translate(1px,0);-ms-transform:translate(1px,0);transform:translate(1px,0)}26%{-webkit-transform:translate(-1px,0);-moz-transform:translate(-1px,0);-ms-transform:translate(-1px,0);transform:translate(-1px,0)}40%{fill:orange;-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}65%{fill:#fff;-webkit-transform:translate(-1px,5px);-moz-transform:translate(-1px,5px);-ms-transform:translate(-1px,5px);transform:translate(-1px,5px)}61%{fill:orange}}.am-weather-cloud-2{-webkit-animation-name:am-weather-cloud-2;-moz-animation-name:am-weather-cloud-2;animation-name:am-weather-cloud-2;-webkit-animation-duration:3s;-moz-animation-duration:3s;animation-duration:3s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite}"
        }
      </style>
    </defs>
    <g id="thunder" filter="url(#blur)">
      <path
        fill="#91C0F8"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M47.7 35.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
        style={{
          WebkitAnimationName: "am-weather-cloud-1",
          MozAnimationName: "am-weather-cloud-1",
          animationName: "am-weather-cloud-1",
          WebkitAnimationDuration: "7s",
          MozAnimationDuration: "7s",
          animationDuration: "7s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: "infinite",
          MozAnimationIterationCount: "infinite",
          animationIterationCount: "infinite",
        }}
        transform="matrix(.6 0 0 .6 10 4)"
      />
      <path
        fill="#57A0EE"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M47.7 34.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
      />
      <path
        fill="orange"
        stroke="#fff"
        d="M14.3-2.9h6.2l-4.1 7.2h3.9l-8.8 10.3 3.4-7.7h-3.8z"
        style={{
          WebkitAnimationName: "am-weather-stroke",
          MozAnimationName: "am-weather-stroke",
          animationName: "am-weather-stroke",
          WebkitAnimationDuration: "1.11s",
          MozAnimationDuration: "1.11s",
          animationDuration: "1.11s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: "infinite",
          MozAnimationIterationCount: "infinite",
          animationIterationCount: "infinite",
        }}
        transform="matrix(1.2 0 0 1.2 11 38)"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(W11d);
export { ForwardRef as W11d };
