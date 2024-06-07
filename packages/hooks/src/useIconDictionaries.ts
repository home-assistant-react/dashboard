import { DashboardIconDictionariesName } from "@home-assistant-react/api/src/defines";
import React from "react";
import { IconDictionaries } from "../../types/src/icons";
import { useStandardApiHandler } from "./useStandardApiHandler";

export const useIconDictionaries = () => {
  const [iconDictionaries, setIconDictionaries] = React.useState<
    IconDictionaries | undefined
  >(window[DashboardIconDictionariesName]);

  const { wrapApiRequest } = useStandardApiHandler();

  const loadDictionaries = wrapApiRequest(async () => {
    const iconsBaseUrl =
      import.meta.env.MODE === "development" ? "" : import.meta.env.BASE_URL;
    const dictionariesRequest = await fetch(
      // eslint-disable-next-line
      iconsBaseUrl + "/icons/icon-dictionaries.json",
    );

    const dictionaries = (await dictionariesRequest.json()) as IconDictionaries;

    window[DashboardIconDictionariesName] = dictionaries;
    setIconDictionaries(dictionaries);
  });

  React.useEffect(() => {
    if (iconDictionaries !== undefined) return;

    loadDictionaries().then();
  }, [iconDictionaries !== undefined]);

  return iconDictionaries;
};
