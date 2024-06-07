import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W01d = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-cloud-1{0%,to{-webkit-transform:translate(-5px,0);-moz-transform:translate(-5px,0);-ms-transform:translate(-5px,0);transform:translate(-5px,0)}50%{-webkit-transform:translate(10px,0);-moz-transform:translate(10px,0);-ms-transform:translate(10px,0);transform:translate(10px,0)}}@keyframes am-weather-cloud-2{0%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(2px,0);-moz-transform:translate(2px,0);-ms-transform:translate(2px,0);transform:translate(2px,0)}}@keyframes am-weather-sun{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes am-weather-sun-shiny{0%,to{stroke-dasharray:3px 10px;stroke-dashoffset:0}50%{stroke-dasharray:.1px 10px;stroke-dashoffset:-1px}}@keyframes am-weather-moon{0%,to{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(15deg);-moz-transform:rotate(15deg);-ms-transform:rotate(15deg);transform:rotate(15deg)}}@keyframes am-weather-moon-star-1{0%{opacity:0}to{opacity:1}}@keyframes am-weather-moon-star-2{0%{opacity:0}to{opacity:1}}@keyframes am-weather-rain{0%{stroke-dashoffset:0}to{stroke-dashoffset:-100}}@keyframes am-weather-snow{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(-1.2px) translateY(2px);-moz-transform:translateX(-1.2px) translateY(2px);-ms-transform:translateX(-1.2px) translateY(2px);transform:translateX(-1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(1.4px) translateY(4px);-moz-transform:translateX(1.4px) translateY(4px);-ms-transform:translateX(1.4px) translateY(4px);transform:translateX(1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(-1.6px) translateY(6px);-moz-transform:translateX(-1.6px) translateY(6px);-ms-transform:translateX(-1.6px) translateY(6px);transform:translateX(-1.6px) translateY(6px);opacity:0}}@keyframes am-weather-snow-reverse{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(1.2px) translateY(2px);-moz-transform:translateX(1.2px) translateY(2px);-ms-transform:translateX(1.2px) translateY(2px);transform:translateX(1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(-1.4px) translateY(4px);-moz-transform:translateX(-1.4px) translateY(4px);-ms-transform:translateX(-1.4px) translateY(4px);transform:translateX(-1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(1.6px) translateY(6px);-moz-transform:translateX(1.6px) translateY(6px);-ms-transform:translateX(1.6px) translateY(6px);transform:translateX(1.6px) translateY(6px);opacity:0}}.am-weather-sun-shiny line{-webkit-animation-name:am-weather-sun-shiny;-moz-animation-name:am-weather-sun-shiny;-ms-animation-name:am-weather-sun-shiny;animation-name:am-weather-sun-shiny;-webkit-animation-duration:2s;-moz-animation-duration:2s;-ms-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}"
        }
      </style>
    </defs>
    <g id="day" filter="url(#blur)">
      <g transform="translate(32 32)">
        <g
          className="am-weather-sun-shiny"
          style={{
            WebkitAnimationTimingFunction: "ease-in-out",
            MozAnimationTimingFunction: "ease-in-out",
            animationTimingFunction: "ease-in-out",
            WebkitAnimationName: "am-weather-sun",
            MozAnimationName: "am-weather-sun",
            animationName: "am-weather-sun",
            WebkitAnimationDuration: "9s",
            MozAnimationDuration: "9s",
            animationDuration: "9s",
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
    </g>
  </svg>
);
const ForwardRef = forwardRef(W01d);
export { ForwardRef as W01d };
