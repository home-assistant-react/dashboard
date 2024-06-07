export const getDomainFromEntityId = (entityId: string) => {
  return String(entityId).split(".")?.[0] || "";
};
