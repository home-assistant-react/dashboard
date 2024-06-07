import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const WasteDryIcon = (
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
      d="M38.191 2.45c-.341.003-.558.046-.558.046a1 1 0 0 0 .344 1.97c.022-.003.046-.01.068-.015 0 0 .315-.074.857.096.543.17 1.243.56 1.873 1.818.18.36.557.576.957.551 1.376-.084 2.031.365 2.457.81.427.447.54.85.54.85a1 1 0 1 0 1.926-.547s-.257-.888-1.02-1.685c-.67-.698-1.87-1.26-3.42-1.332-.812-1.308-1.825-2.093-2.711-2.371a4.275 4.275 0 0 0-1.313-.192zM13.033 4s-.924-.028-1.916.455c-.869.423-1.771 1.395-2.314 2.85C7.31 7.678 6.25 8.402 5.715 9.16a4.152 4.152 0 0 0-.71 1.736 1 1 0 1 0 1.99.208s.024-.326.353-.79c.328-.464.913-1.012 2.304-1.226a.999.999 0 0 0 .817-.742c.34-1.336.967-1.822 1.521-2.092.556-.27.977-.254.977-.254a1 1 0 0 0 .066-2zM32.43 8.336c-1.394-.076-2.903.333-4.282 1.203-1.3.821-2.17 1.949-2.714 3.149-1.315-.022-2.704.28-4 1.1-1.71 1.08-2.877 2.641-3.22 4.3a1 1 0 1 0 1.96.404c.204-.99 1.02-2.19 2.328-3.015v.002c1.169-.738 2.428-.985 3.396-.85a1 1 0 0 0 1.09-.691c.293-.935 1.057-1.97 2.229-2.71 1.053-.665 2.19-.946 3.103-.896a1 1 0 1 0 .11-1.996zm5.576 5.67a2.141 2.141 0 0 0-1.89 1.39l-1.153 3.163a1 1 0 0 0 .49 1.232l-.148.215.174.062a3.257 3.257 0 0 0-4.157 1.938 1 1 0 0 0-.002.002l-.765 2.107a3.214 3.214 0 0 0 .058 2.324 2.988 2.988 0 0 0-1.511 1.663l-.358.984A9.539 9.539 0 0 0 27.5 29c-.18 0-.355.023-.531.031-.406.038-1.25.133-2 .282a10.95 10.95 0 0 0-4.139 2.01c-1.386-2.889-3.786-5.149-6.031-6.725a21.076 21.076 0 0 0-3.348-1.938l.903-4.46a1 1 0 0 0-1.01-1.2 1 1 0 0 0-.229.033l-7.11 1.906a1 1 0 0 0-.491 1.627l3.062 3.47c-.487.632-.982 1.36-1.451 2.243-1.144 2.158-2.101 5.007-2.113 8.14C1.245 35.194 0 36.957 0 39c-.004.359.184.695.496.879.313.18.695.18 1.008 0 .312-.184.5-.52.496-.879a2.986 2.986 0 0 1 3.406-2.969c.402.051.801-.145 1-.5A2.942 2.942 0 0 1 9 34c.844 0 1.61.348 2.156.906a.998.998 0 0 0 1.531-.158A3.974 3.974 0 0 1 16 33c1.195 0 2.258.535 3 1.375.195.211.469.328.758.324a1.01 1.01 0 0 0 .742-.355 8.998 8.998 0 0 1 7-3.344c.182 0 .36.016.537.03l-1.35 3.706a8.88 8.88 0 0 0-2.552 1.34 1 1 0 1 0 1.215 1.588 6.87 6.87 0 0 1 3.129-1.33 6.903 6.903 0 0 1 7.722 4.977 1 1 0 0 0 1.45.605c.42-.234.854-.398 1.322-.47a3.984 3.984 0 0 1 4.568 3.335 1 1 0 1 0 1.977-.306c-.426-2.732-2.655-4.747-5.284-5.036l1.432-3.933c.199.03.4.022.584-.069.547-.27 1.129-.437 1.75-.437 2.219 0 4 1.781 4 4-.004.359.184.695.496.879.313.18.695.18 1.008 0 .313-.184.5-.52.496-.879 0-3.301-2.699-6-6-6-.562 0-1.046.195-1.549.352l.125-.346a2.984 2.984 0 0 0-.09-2.246 3.219 3.219 0 0 0 1.541-1.742l.766-2.108a3.257 3.257 0 0 0-1.938-4.156l.174.062.024-.257a1 1 0 0 0 1.168-.631l1.15-3.162a2.137 2.137 0 0 0-1.267-2.72l-5.27-1.917a2.082 2.082 0 0 0-.828-.123zm.049 2c.026-.012.057-.012.095.002l5.27 1.918c.075.027.1.08.072.156l-.808 2.22-5.5-2 .81-2.222c.014-.037.035-.062.06-.074zm-27.98 3.379-.53 2.613a1.593 1.593 0 0 0-.682.05c-.376.102-.67.27-.941.487l-1.838-2.082 3.99-1.068zm27.314 1.12 3.722 1.354-.146 1.54a1 1 0 0 0 .654 1.033l.55.2c.657.24.984.939.745 1.595l-.768 2.107c-.239.657-.936.983-1.591.744l-2.192-.797-2.144-.781-.008-.004-.684 1.879.008.004 1.61.586 2.724.992.016.004.215.078c.53.193.79.75.597 1.281a1 1 0 0 0-.002 0l-2.675 7.354c-.119.05-.235.104-.358.148-1.436-3.468-4.86-5.787-8.678-5.552l1.998-5.483v-.002a.984.984 0 0 1 1.282-.596l.228.082 1.137.415.685-1.88h-.002l-1.134-.413a1.23 1.23 0 0 1-.744-1.594l.767-2.108c.24-.656.936-.983 1.592-.744a1 1 0 0 0 .002 0l.553.201a1 1 0 0 0 1.164-.37l.877-1.272zM9.346 24.038c.056.003.105 0 .187.024.248.069.61.199 1.033.388.847.379 1.949.988 3.084 1.785 1.97 1.384 4.03 3.346 5.235 5.65C18.037 31.355 17.083 31 16 31c-1.699 0-3.125.828-4.219 1.969C10.973 32.409 10.055 32 9 32c-1.594 0-2.902.863-3.813 2.031-.064-.003-.103-.025-.171-.029.094-2.565.91-4.962 1.877-6.785.536-1.012 1.117-1.847 1.613-2.422.348-.404.706-.654.84-.758zM15 40a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm15 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zM6 45a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm17 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm17 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2z"
    />
  </svg>
);
const ForwardRef = forwardRef(WasteDryIcon);
export { ForwardRef as WasteDryIcon };
