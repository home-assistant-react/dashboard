import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const WasteBottleIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 50 50"
    ref={ref}
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M22 0c-1.645 0-3 1.355-3 3v4.719c-4.07 1.508-7 5.238-7 9.593 0 1.532.793 2.864 2 3.72-1.2.917-2 2.355-2 3.968 0 1.629.813 3.086 2.031 4-1.219.914-2.031 2.371-2.031 4s.813 3.086 2.031 4C12.812 37.914 12 39.371 12 41v4c0 2.746 2.254 5 5 5h16c2.746 0 5-2.254 5-5v-4c0-1.629-.813-3.086-2.031-4C37.187 36.086 38 34.629 38 33s-.813-3.086-2.031-4C37.187 28.086 38 26.629 38 25c0-1.613-.8-3.05-2-3.969 1.188-.843 2-2.16 2-3.718 0-4.356-2.93-8.086-7-9.594V3c0-1.645-1.355-3-3-3Zm0 2h6c.555 0 1 .445 1 1v4h-8V3c0-.555.445-1 1-1Zm1 7h4c4.992 0 9 3.8 9 8.313C36 18.84 34.715 20 33 20h-.094a1 1 0 0 0-.812.5v.031c-.13.227-.16.496-.094.75l.031.032v.062l.032.031a.933.933 0 0 0 .124.219l.032.031c.07.086.156.16.25.219.02.012.043.023.062.031l.032.032h.062l.031.03h.094c.063.016.125.028.188.032H33a3 3 0 0 1 0 6h-.094a1 1 0 0 0-.812.5v.031c-.13.227-.16.496-.094.75l.031.032v.062l.032.031a.933.933 0 0 0 .124.219l.032.031c.07.086.156.16.25.219.02.012.043.023.062.031l.032.032h.062l.031.03h.094c.063.016.125.028.188.032H33a3 3 0 0 1 0 6 1.037 1.037 0 0 0-.469.125c-.09.04-.176.094-.25.156a1.302 1.302 0 0 0-.062.094.472.472 0 0 0-.063.063c-.09.14-.144.3-.156.468V37a.971.971 0 0 0 .125.5c.008.02.02.043.031.063.02.03.04.062.063.093.074.074.156.137.25.188.02.023.039.043.062.062.098.047.203.078.313.094.05.004.105.004.156 0a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3 .972.972 0 0 0 .281-.031A.998.998 0 0 0 18 37a.668.668 0 0 0 0-.125 1.003 1.003 0 0 0-.531-.781.88.88 0 0 0-.094-.032 1.169 1.169 0 0 0-.219-.063 1.043 1.043 0 0 0-.156.001 3 3 0 0 1 0-6 .972.972 0 0 0 .281-.031A.998.998 0 0 0 18 29a.668.668 0 0 0 0-.125.998.998 0 0 0-1-.875 3 3 0 0 1 0-6 .972.972 0 0 0 .281-.031 1 1 0 0 0 .5-.344.472.472 0 0 0 .063-.063c.078-.113.129-.242.156-.375v-.093A.999.999 0 0 0 17 20c-1.684 0-3-1.29-3-2.688C14 12.802 18.008 9 23 9Z"
    />
  </svg>
);
const ForwardRef = forwardRef(WasteBottleIcon);
export { ForwardRef as WasteBottleIcon };