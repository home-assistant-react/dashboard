import { callService, Connection } from "home-assistant-js-websocket";
import {
  Dict,
  LightBrightness,
  LightColor,
  LightColorMode,
  LightState,
} from "@home-assistant-react/types/src";
import { lightSupportsColorMode } from "@home-assistant-react/helpers/src/home-assistant/entities/light";
import {
  adjustColorBrightness,
  hs2rgb,
  logError,
} from "@home-assistant-react/helpers/src";

export class LightServiceError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, LightServiceError.prototype);
  }
}

export interface LightServicesOptions {
  brightness?: LightBrightness;
  color?: LightColor;
  effect?: string;
  color_temp_kelvin?: number;
}
export class LightServices {
  constructor(
    public connection: Connection,
    public state?: Partial<LightState>,
  ) {}

  async runService(
    entityId: string | undefined,
    service: string,
    options?: LightServicesOptions,
  ) {
    if (!entityId) throw new LightServiceError("Entity id not provided");
    const { color, ...rest } = options || {};
    try {
      return await callService(this.connection, "light", service, {
        entity_id: entityId,
        ...color,
        ...rest,
      });
    } catch (err) {
      logError(err);
    }
  }

  async turnOn(options?: LightServicesOptions) {
    return this.runService(this.state?.entity_id, "turn_on", options);
  }
  async turnOff(options?: LightServicesOptions) {
    return this.runService(this.state?.entity_id, "turn_off", options);
  }
  async setBrightness(
    brightness: LightBrightness,
    options?: LightServicesOptions,
  ) {
    return this.turnOn({
      brightness,
      ...options,
    });
  }

  async setTemperatureKelvin(temperature: number) {
    return this.runService(this.state?.entity_id, "turn_on", {
      color_temp_kelvin: temperature,
    });
  }

  async setEffect(effect: string) {
    return this.runService(this.state?.entity_id, "turn_on", { effect });
  }

  async setColor(
    lightState: LightState,
    hs_color: [number, number],
    brightness?: number,
    brightnessAdjusted?: number,
  ) {
    const hsColorValue: [number, number] = [hs_color[0], hs_color[1] * 100];
    const rgbColor = hs2rgb(hs_color);

    if (
      lightSupportsColorMode(lightState, LightColorMode.RGBWW) ||
      lightSupportsColorMode(lightState, LightColorMode.RGBW)
    ) {
      return this.setRgbWColor(
        lightState,
        brightness
          ? adjustColorBrightness(rgbColor, (brightness * 255) / 100)
          : rgbColor,
      );
    } else if (lightSupportsColorMode(lightState, LightColorMode.RGB)) {
      if (brightnessAdjusted) {
        const brightnessAdjust = (brightnessAdjusted / 255) * 100;
        const brightnessPercentage = Math.round(
          ((lightState.attributes.brightness || 0) * brightnessAdjust) / 255,
        );
        const adjustedRgbColor = adjustColorBrightness(
          rgbColor,
          brightnessAdjusted,
          true,
        );
        this.applyColor(
          { rgb_color: adjustedRgbColor },
          { brightness_pct: brightnessPercentage },
        );
      } else {
        return await this.applyColor({ rgb_color: rgbColor });
      }
    } else {
      return await this.applyColor({ hs_color: hsColorValue });
    }
  }

  async setRgbWColor(
    lightState: LightState,
    rgbColor: [number, number, number],
  ) {
    if (lightSupportsColorMode(lightState, LightColorMode.RGBWW)) {
      const rgbwwColor: [number, number, number, number, number] = lightState
        .attributes.rgbww_color
        ? [...(lightState.attributes.rgbww_color as never)]
        : [0, 0, 0, 0, 0];
      const rgbww_color = rgbColor.concat(rgbwwColor.slice(3)) as [
        number,
        number,
        number,
        number,
        number,
      ];
      return await this.applyColor({ rgbww_color });
    } else if (lightSupportsColorMode(lightState, LightColorMode.RGBW)) {
      const rgbwColor: [number, number, number, number] = (lightState.attributes
        .rgbw_color as never)
        ? [...(lightState.attributes.rgbw_color as never)]
        : [0, 0, 0, 0];
      const rgbw_color = rgbColor.concat(rgbwColor.slice(3)) as [
        number,
        number,
        number,
        number,
      ];
      return await this.applyColor({ rgbw_color });
    }
  }

  async applyColor(color: LightColor, options?: Dict) {
    return await this.runService(this.state?.entity_id, "turn_on", {
      color,
      ...options,
    });
  }
}
