import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const W13n = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
          "@keyframes am-weather-cloud-2{0%,to{-webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(2px,0);-moz-transform:translate(2px,0);-ms-transform:translate(2px,0);transform:translate(2px,0)}}@keyframes am-weather-snow{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(-1.2px) translateY(2px);-moz-transform:translateX(-1.2px) translateY(2px);-ms-transform:translateX(-1.2px) translateY(2px);transform:translateX(-1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(1.4px) translateY(4px);-moz-transform:translateX(1.4px) translateY(4px);-ms-transform:translateX(1.4px) translateY(4px);transform:translateX(1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(-1.6px) translateY(6px);-moz-transform:translateX(-1.6px) translateY(6px);-ms-transform:translateX(-1.6px) translateY(6px);transform:translateX(-1.6px) translateY(6px);opacity:0}}@keyframes am-weather-snow-reverse{0%{-webkit-transform:translateX(0) translateY(0);-moz-transform:translateX(0) translateY(0);-ms-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}33.33%{-webkit-transform:translateX(1.2px) translateY(2px);-moz-transform:translateX(1.2px) translateY(2px);-ms-transform:translateX(1.2px) translateY(2px);transform:translateX(1.2px) translateY(2px)}66.66%{-webkit-transform:translateX(-1.4px) translateY(4px);-moz-transform:translateX(-1.4px) translateY(4px);-ms-transform:translateX(-1.4px) translateY(4px);transform:translateX(-1.4px) translateY(4px);opacity:1}to{-webkit-transform:translateX(1.6px) translateY(6px);-moz-transform:translateX(1.6px) translateY(6px);-ms-transform:translateX(1.6px) translateY(6px);transform:translateX(1.6px) translateY(6px);opacity:0}}"
        }
      </style>
    </defs>
    <g id="snowy-6" filter="url(#blur)">
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
      <g
        style={{
          WebkitAnimationName: "am-weather-snow",
          MozAnimationName: "am-weather-snow",
          animationName: "am-weather-snow",
          WebkitAnimationDuration: "2s",
          MozAnimationDuration: "2s",
          animationDuration: "2s",
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
          stroke="#57A0EE"
          strokeLinecap="round"
          strokeWidth={1.2}
          d="M23 44.5v5"
        />
        <path
          fill="none"
          stroke="#57A0EE"
          strokeLinecap="round"
          d="m24.768 45.232-3.536 3.536M25.5 47h-5M24.768 48.768l-3.536-3.536"
        />
      </g>
      <g
        style={{
          WebkitAnimationName: "am-weather-snow",
          MozAnimationName: "am-weather-snow",
          animationName: "am-weather-snow",
          WebkitAnimationDelay: "1.2s",
          MozAnimationDelay: "1.2s",
          animationDelay: "1.2s",
          WebkitAnimationDuration: "2s",
          MozAnimationDuration: "2s",
          animationDuration: "2s",
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
          stroke="#57A0EE"
          strokeLinecap="round"
          strokeWidth={1.2}
          d="M31 44.5v5"
        />
        <path
          fill="none"
          stroke="#57A0EE"
          strokeLinecap="round"
          d="m32.768 45.232-3.536 3.536M33.5 47h-5M32.768 48.768l-3.536-3.536"
        />
      </g>
      <g
        style={{
          WebkitAnimationName: "am-weather-snow-reverse",
          MozAnimationName: "am-weather-snow-reverse",
          animationName: "am-weather-snow-reverse",
          WebkitAnimationDuration: "2s",
          MozAnimationDuration: "2s",
          animationDuration: "2s",
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
          stroke="#57A0EE"
          strokeLinecap="round"
          strokeWidth={1.2}
          d="M40 44.5v5"
        />
        <path
          fill="none"
          stroke="#57A0EE"
          strokeLinecap="round"
          d="m41.768 45.232-3.536 3.536M42.5 47h-5M41.768 48.768l-3.536-3.536"
        />
      </g>
    </g>
  </svg>
);
const ForwardRef = forwardRef(W13n);
export { ForwardRef as W13n };
