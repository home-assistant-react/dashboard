import { tailwindConfig } from "@home-assistant-react/tailwindcss-config";
import { create } from "@kodingdotninja/use-tailwind-breakpoint";
import resolveConfig from "tailwindcss/resolveConfig";

const config = resolveConfig({ ...tailwindConfig, content: [] });

export const { useBreakpoint } = create(config.theme.screens);
