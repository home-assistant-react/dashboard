import {
  useHassGetEntity,
  UseHassGetEntityReturn,
} from "@home-assistant-react/api/src";
import { useClimateServices } from "@home-assistant-react/api/src/services/climate/useClimateServices";
import { HassClimateEntityAttributes } from "@home-assistant-react/types/src/home-assistant/entities-state/climate";

export interface UseClimateEntityReturn
  extends UseHassGetEntityReturn<HassClimateEntityAttributes> {
  services: ReturnType<typeof useClimateServices>;
}

export const useClimateEntity = <T extends HassClimateEntityAttributes>(
  entityId: string,
): UseClimateEntityReturn | undefined => {
  const climateEntity = useHassGetEntity<T>(entityId);
  const climateServices = useClimateServices(climateEntity);
  if (!climateEntity) return undefined;
  return {
    ...climateEntity,
    services: climateServices,
  };
};
