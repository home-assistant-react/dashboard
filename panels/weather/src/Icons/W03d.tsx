import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W03d = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-cloud-1{0%,to{-webkit-transform:translate(-5px,0);-moz-transform:translate(-5px,0);-ms-transform:translate(-5px,0);transform:translate(-5px,0)}50%{-webkit-transform:translate(10px,0);-moz-transform:translate(10px,0);-ms-transform:translate(10px,0);transform:translate(10px,0)}}@keyframes am-weather-cloud-2{0%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(2px,0);-moz-transform:translate(2px,0);-ms-transform:translate(2px,0);transform:translate(2px,0)}}@keyframes am-weather-sun{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes am-weather-sun-shiny{0%,to{stroke-dasharray:3px 10px;stroke-dashoffset:0}50%{stroke-dasharray:.1px 10px;stroke-dashoffset:-1px}}@keyframes am-weather-moon{0%,to{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(15deg);-moz-transform:rotate(15deg);-ms-transform:rotate(15deg);transform:rotate(15deg)}}@keyframes am-weather-moon-star-1{0%{opacity:0}to{opacity:1}}@keyframes am-weather-moon-star-2{0%{opacity:0}to{opacity:1}}@keyframes am-weather-rain{0%{stroke-dashoffset:0}to{stroke-dashoffset:-100}}@keyframes am-weather-snow{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(-1.2px) translateY(2px);-moz-transform:translateX(-1.2px) translateY(2px);-ms-transform:translateX(-1.2px) translateY(2px);transform:translateX(-1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(1.4px) translateY(4px);-moz-transform:translateX(1.4px) translateY(4px);-ms-transform:translateX(1.4px) translateY(4px);transform:translateX(1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(-1.6px) translateY(6px);-moz-transform:translateX(-1.6px) translateY(6px);-ms-transform:translateX(-1.6px) translateY(6px);transform:translateX(-1.6px) translateY(6px);opacity:0}}@keyframes am-weather-snow-reverse{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(1.2px) translateY(2px);-moz-transform:translateX(1.2px) translateY(2px);-ms-transform:translateX(1.2px) translateY(2px);transform:translateX(1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(-1.4px) translateY(4px);-moz-transform:translateX(-1.4px) translateY(4px);-ms-transform:translateX(-1.4px) translateY(4px);transform:translateX(-1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(1.6px) translateY(6px);-moz-transform:translateX(1.6px) translateY(6px);-ms-transform:translateX(1.6px) translateY(6px);transform:translateX(1.6px) translateY(6px);opacity:0}}.am-weather-moon,.am-weather-sun{-webkit-animation-name:am-weather-sun;-moz-animation-name:am-weather-sun;-ms-animation-name:am-weather-sun;animation-name:am-weather-sun;-webkit-animation-duration:9s;-moz-animation-duration:9s;-ms-animation-duration:9s;animation-duration:9s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}.am-weather-moon{-webkit-animation-name:am-weather-moon;-moz-animation-name:am-weather-moon;-ms-animation-name:am-weather-moon;animation-name:am-weather-moon;-webkit-animation-duration:6s;-moz-animation-duration:6s;-ms-animation-duration:6s;animation-duration:6s;-webkit-transform-origin:12.5px 15.15px 0;-moz-transform-origin:12.5px 15.15px 0;-ms-transform-origin:12.5px 15.15px 0;transform-origin:12.5px 15.15px 0}.am-weather-moon-star-1{-webkit-animation-name:am-weather-moon-star-1;-moz-animation-name:am-weather-moon-star-1;-ms-animation-name:am-weather-moon-star-1;animation-name:am-weather-moon-star-1;-webkit-animation-delay:3s;-moz-animation-delay:3s;-ms-animation-delay:3s;animation-delay:3s;-webkit-animation-duration:5s;-moz-animation-duration:5s;-ms-animation-duration:5s;animation-duration:5s;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;animation-iteration-count:1}.am-weather-moon-star-1,.am-weather-moon-star-2,.am-weather-rain-1,.am-weather-rain-2{-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear}.am-weather-moon-star-2{-webkit-animation-name:am-weather-moon-star-2;-moz-animation-name:am-weather-moon-star-2;-ms-animation-name:am-weather-moon-star-2;animation-name:am-weather-moon-star-2;-webkit-animation-delay:5s;-moz-animation-delay:5s;-ms-animation-delay:5s;animation-delay:5s;-webkit-animation-duration:4s;-moz-animation-duration:4s;-ms-animation-duration:4s;animation-duration:4s;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;animation-iteration-count:1}.am-weather-rain-1,.am-weather-rain-2{-webkit-animation-name:am-weather-rain;-moz-animation-name:am-weather-rain;-ms-animation-name:am-weather-rain;animation-name:am-weather-rain;-webkit-animation-duration:8s;-moz-animation-duration:8s;-ms-animation-duration:8s;animation-duration:8s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}.am-weather-rain-2{-webkit-animation-delay:.25s;-moz-animation-delay:.25s;-ms-animation-delay:.25s;animation-delay:.25s}.am-weather-snow-1{-webkit-animation-name:am-weather-snow;-moz-animation-name:am-weather-snow;-ms-animation-name:am-weather-snow;animation-name:am-weather-snow}.am-weather-snow-1,.am-weather-snow-2,.am-weather-snow-3{-webkit-animation-duration:2s;-moz-animation-duration:2s;-ms-animation-duration:2s;animation-duration:2s;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite}.am-weather-snow-2{-webkit-animation-name:am-weather-snow;-moz-animation-name:am-weather-snow;-ms-animation-name:am-weather-snow;animation-name:am-weather-snow;-webkit-animation-delay:1.2s;-moz-animation-delay:1.2s;-ms-animation-delay:1.2s;animation-delay:1.2s}.am-weather-snow-3{-webkit-animation-name:am-weather-snow-reverse;-moz-animation-name:am-weather-snow-reverse;-ms-animation-name:am-weather-snow-reverse;animation-name:am-weather-snow-reverse}.am-weather-easing-ease-in-out{-webkit-animation-timing-function:ease-in-out;-moz-animation-timing-function:ease-in-out;-ms-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}"
        }
      </style>
    </defs>
    <g id="cloudy" filter="url(#blur)">
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
        transform="matrix(.6 0 0 .6 10 2)"
      />
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
const ForwardRef = forwardRef(W03d);
export { ForwardRef as W03d };
