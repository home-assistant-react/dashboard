import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W01n = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-cloud-1{0%,to{-webkit-transform:translate(-5px,0);-moz-transform:translate(-5px,0);-ms-transform:translate(-5px,0);transform:translate(-5px,0)}50%{-webkit-transform:translate(10px,0);-moz-transform:translate(10px,0);-ms-transform:translate(10px,0);transform:translate(10px,0)}}@keyframes am-weather-cloud-2{0%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(2px,0);-moz-transform:translate(2px,0);-ms-transform:translate(2px,0);transform:translate(2px,0)}}@keyframes am-weather-sun{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes am-weather-sun-shiny{0%,to{stroke-dasharray:3px 10px;stroke-dashoffset:0}50%{stroke-dasharray:.1px 10px;stroke-dashoffset:-1px}}@keyframes am-weather-moon{0%,to{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(15deg);-moz-transform:rotate(15deg);-ms-transform:rotate(15deg);transform:rotate(15deg)}}@keyframes am-weather-moon-star-1{0%{opacity:0}to{opacity:1}}@keyframes am-weather-moon-star-2{0%{opacity:0}to{opacity:1}}@keyframes am-weather-rain{0%{stroke-dashoffset:0}to{stroke-dashoffset:-100}}@keyframes am-weather-snow{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(-1.2px) translateY(2px);-moz-transform:translateX(-1.2px) translateY(2px);-ms-transform:translateX(-1.2px) translateY(2px);transform:translateX(-1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(1.4px) translateY(4px);-moz-transform:translateX(1.4px) translateY(4px);-ms-transform:translateX(1.4px) translateY(4px);transform:translateX(1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(-1.6px) translateY(6px);-moz-transform:translateX(-1.6px) translateY(6px);-ms-transform:translateX(-1.6px) translateY(6px);transform:translateX(-1.6px) translateY(6px);opacity:0}}@keyframes am-weather-snow-reverse{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(1.2px) translateY(2px);-moz-transform:translateX(1.2px) translateY(2px);-ms-transform:translateX(1.2px) translateY(2px);transform:translateX(1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(-1.4px) translateY(4px);-moz-transform:translateX(-1.4px) translateY(4px);-ms-transform:translateX(-1.4px) translateY(4px);transform:translateX(-1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(1.6px) translateY(6px);-moz-transform:translateX(1.6px) translateY(6px);-ms-transform:translateX(1.6px) translateY(6px);transform:translateX(1.6px) translateY(6px);opacity:0}}.am-weather-cloud-1,.am-weather-cloud-2,.am-weather-rain-1,.am-weather-rain-2,.am-weather-sun{-webkit-animation-name:am-weather-cloud-1;-moz-animation-name:am-weather-cloud-1;animation-name:am-weather-cloud-1;-webkit-animation-duration:7s;-moz-animation-duration:7s;animation-duration:7s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite}.am-weather-cloud-2,.am-weather-rain-1,.am-weather-rain-2,.am-weather-sun{-webkit-animation-name:am-weather-cloud-2;-moz-animation-name:am-weather-cloud-2;animation-name:am-weather-cloud-2;-webkit-animation-duration:3s;-moz-animation-duration:3s;animation-duration:3s}.am-weather-rain-1,.am-weather-rain-2,.am-weather-sun{-webkit-animation-name:am-weather-sun;-moz-animation-name:am-weather-sun;-ms-animation-name:am-weather-sun;animation-name:am-weather-sun;-webkit-animation-duration:9s;-moz-animation-duration:9s;-ms-animation-duration:9s;animation-duration:9s;-ms-animation-timing-function:linear;-ms-animation-iteration-count:infinite}.am-weather-rain-1,.am-weather-rain-2{-webkit-animation-name:am-weather-rain;-moz-animation-name:am-weather-rain;-ms-animation-name:am-weather-rain;animation-name:am-weather-rain;-webkit-animation-duration:8s;-moz-animation-duration:8s;-ms-animation-duration:8s;animation-duration:8s}.am-weather-rain-2{-webkit-animation-delay:.25s;-moz-animation-delay:.25s;-ms-animation-delay:.25s;animation-delay:.25s}.am-weather-snow-1{-webkit-animation-name:am-weather-snow;-moz-animation-name:am-weather-snow;-ms-animation-name:am-weather-snow;animation-name:am-weather-snow}.am-weather-snow-1,.am-weather-snow-2,.am-weather-snow-3{-webkit-animation-duration:2s;-moz-animation-duration:2s;-ms-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}.am-weather-snow-2{-webkit-animation-name:am-weather-snow;-moz-animation-name:am-weather-snow;-ms-animation-name:am-weather-snow;animation-name:am-weather-snow;-webkit-animation-delay:1.2s;-moz-animation-delay:1.2s;-ms-animation-delay:1.2s;animation-delay:1.2s}.am-weather-snow-3{-webkit-animation-name:am-weather-snow-reverse;-moz-animation-name:am-weather-snow-reverse;-ms-animation-name:am-weather-snow-reverse;animation-name:am-weather-snow-reverse}.am-weather-easing-ease-in-out{-webkit-animation-timing-function:ease-in-out;-moz-animation-timing-function:ease-in-out;-ms-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}"
        }
      </style>
    </defs>
    <g id="night" filter="url(#blur)">
      <path
        fill="orange"
        strokeMiterlimit={10}
        d="M3.3 1.5 4 2.7l1.2.6L4 4l-.7 1.2L2.7 4l-1.2-.7 1.2-.6z"
        style={{
          WebkitAnimationName: "am-weather-moon-star-1",
          MozAnimationName: "am-weather-moon-star-1",
          animationName: "am-weather-moon-star-1",
          WebkitAnimationDelay: "3s",
          MozAnimationDelay: "3s",
          animationDelay: "3s",
          WebkitAnimationDuration: "5s",
          MozAnimationDuration: "5s",
          animationDuration: "5s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: 1,
          MozAnimationIterationCount: 1,
          animationIterationCount: 1,
        }}
        transform="translate(20 20)"
      />
      <path
        fill="orange"
        strokeMiterlimit={10}
        d="M3.3 1.5 4 2.7l1.2.6L4 4l-.7 1.2L2.7 4l-1.2-.7 1.2-.6z"
        style={{
          WebkitAnimationName: "am-weather-moon-star-2",
          MozAnimationName: "am-weather-moon-star-2",
          animationName: "am-weather-moon-star-2",
          WebkitAnimationDelay: "5s",
          MozAnimationDelay: "5s",
          animationDelay: "5s",
          WebkitAnimationDuration: "4s",
          MozAnimationDuration: "4s",
          animationDuration: "4s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: 1,
          MozAnimationIterationCount: 1,
          animationIterationCount: 1,
        }}
        transform="translate(40 30)"
      />
      <path
        fill="orange"
        stroke="orange"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.5 13.2c0-3.7 2-6.9 5-8.7-1.5-.9-3.2-1.3-5-1.3-5.5 0-10 4.5-10 10s4.5 10 10 10c1.8 0 3.5-.5 5-1.3-3-1.7-5-5-5-8.7z"
        style={{
          WebkitAnimationName: "am-weather-moon",
          MozAnimationName: "am-weather-moon",
          animationName: "am-weather-moon",
          WebkitAnimationDuration: "6s",
          MozAnimationDuration: "6s",
          animationDuration: "6s",
          WebkitAnimationTimingFunction: "linear",
          MozAnimationTimingFunction: "linear",
          animationTimingFunction: "linear",
          WebkitAnimationIterationCount: "infinite",
          MozAnimationIterationCount: "infinite",
          animationIterationCount: "infinite",
          WebkitTransformOrigin: "12.5px 15.15px 0",
          MozTransformOrigin: "12.5px 15.15px 0",
          msTransformOrigin: "12.5px 15.15px 0",
          transformOrigin: "12.5px 15.15px 0",
        }}
        transform="translate(20 20)"
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(W01n);
export { ForwardRef as W01n };
