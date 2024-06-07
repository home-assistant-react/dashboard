export const getPanelDomObjectById = (id: string): HTMLDivElement | null => {
  return document.querySelector(`.panel-${id}`);
};
