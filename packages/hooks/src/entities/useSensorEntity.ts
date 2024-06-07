import {
  useHassGetEntity,
  UseHassGetEntityReturn,
} from "@home-assistant-react/api/src";
import { HassSensorEntityAttributes } from "../../../types/src";

export interface UseSensorEntityReturn
  extends UseHassGetEntityReturn<HassSensorEntityAttributes> {}

export const useSensorEntity = <T extends HassSensorEntityAttributes>(
  entityId: string,
): UseSensorEntityReturn | undefined => {
  const sensorEntity = useHassGetEntity<T>(entityId);
  if (!sensorEntity) return undefined;
  return {
    ...sensorEntity,
  };
};
