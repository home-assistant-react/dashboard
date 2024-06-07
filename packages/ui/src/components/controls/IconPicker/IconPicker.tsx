import { useHass } from "@home-assistant-react/api/src";
import { getObjectKeys } from "@home-assistant-react/helpers/src";
import { useIconDictionaries } from "@home-assistant-react/hooks/src/useIconDictionaries";
import { IconDictionaries } from "@home-assistant-react/types/src/icons";
import React from "react";
import { Scrollbars, positionValues } from "react-custom-scrollbars";
import { Tabs, TabsList, TabsTrigger } from "../../disclosure";
import { Spinner } from "../../feedback/Spinner";
import { IconPickerProps } from "./IconPicker.types";
import { Box, Flex, Grid } from "../../../primitives/common";
import { IconPickerIconButton } from "./IconPickerIconButton";
import { IconPickerContext, IconPickerProvider } from "./IconPicker.provider";
import { DebouncedInput } from "../DebouncedInput";

const classes = {
  IconPickerWrapper: "h-[320px]",
  IconPickerLoadingWrapper: "items-center justify-center",
  IconPickerGrid: "gap-2 pl-2 py-4 grid-cols-[1fr_1fr_1fr_1fr_1fr]",
  IconPickerSearchInputWrapper: "",
  Tabs: "w-full h-full flex flex-col",
  TabsList: "py-2 rounded-none border-b bg-muted",
  IconPickerSearchInput:
    "border-none border-b shadow-none bg-secondary rounded-none",
};

export const IconPicker: React.FC<IconPickerProps> = (props) => {
  const iconDictionaries = useIconDictionaries();

  if (!iconDictionaries) {
    return (
      <Flex
        className={[
          classes.IconPickerWrapper,
          classes.IconPickerLoadingWrapper,
        ]}
      >
        {}
        <Spinner />
      </Flex>
    );
  }

  return <IconPickerInner iconDictionaries={iconDictionaries} {...props} />;
};

export const IconPickerInner: React.FC<
  IconPickerProps & { iconDictionaries: IconDictionaries }
> = ({ onSelect, initialIconSet, iconDictionaries }) => {
  const hass = useHass();
  const scrollBarsRef = React.useRef<Scrollbars | null>(null);
  const handleIconSelect = (iconName: string, iconSet: string) => {
    onSelect?.({ icon: iconName, set: iconSet });
  };

  const handleSearchValueChange = () => {
    scrollBarsRef.current?.scrollTop(0);
  };

  const iconPickerDictionaries = React.useMemo(() => {
    const customIconsKeys = getObjectKeys(hass.customIcons || {});
    return {
      ...iconDictionaries,
      custom: {
        icons: customIconsKeys.reduce(
          (acc, iconKey) => ({
            ...acc,
            [hass.customIcons?.[iconKey]?.id || ""]:
              hass.customIcons?.[iconKey].icon_name,
          }),
          {},
        ),
        keys: customIconsKeys.map(
          (iconKey) => hass.customIcons?.[iconKey].id || "",
        ),
      },
    };
  }, [hass.customIcons]);

  return (
    <IconPickerProvider
      dictionaries={iconPickerDictionaries}
      onSearchValueChange={handleSearchValueChange}
      initialIconSet={initialIconSet}
    >
      <IconPickerContext.Consumer>
        {(state) => {
          if (!state) return null;

          const handleScrollChange = (values: positionValues) => {
            if (values.top >= 0.9 && state.page + 1 <= state.totalIconsPages) {
              state.setPage((page) => page + 1);
            }
          };

          return (
            <>
              <Tabs
                defaultValue="custom"
                value={state.iconSet}
                className={classes.Tabs}
                onValueChange={(value) => state.setIconSet(value as never)}
              >
                <TabsList className={classes.TabsList}>
                  <TabsTrigger value="custom">Own icons</TabsTrigger>
                  <TabsTrigger value="mdi">Mdi</TabsTrigger>
                  <TabsTrigger value="lucide">Lucide</TabsTrigger>
                </TabsList>
              </Tabs>
              <DebouncedInput
                className={classes.IconPickerSearchInputWrapper}
                wrapperClassName={classes.IconPickerSearchInput}
                onChangeValue={state.setSearchValue}
                placeholder={"Search icons"}
                hideEmptyMessages
                isClearable
              />
              <Scrollbars
                ref={scrollBarsRef}
                className={classes.IconPickerWrapper}
                onUpdate={handleScrollChange}
                style={{ height: undefined }}
              >
                <Grid className={classes.IconPickerGrid}>
                  {state.availableIcons
                    ? state.availableIcons.map((iconName) => {
                        return (
                          <Box key={iconName}>
                            <IconPickerIconButton
                              iconName={
                                iconPickerDictionaries[state.iconSet].icons[
                                  iconName
                                ]
                              }
                              onClick={handleIconSelect.bind(
                                null,
                                iconName,
                                state.iconSet,
                              )}
                              icon={iconName}
                              iconSet={state.iconSet}
                            />
                          </Box>
                        );
                      })
                    : undefined}
                </Grid>
              </Scrollbars>
            </>
          );
        }}
      </IconPickerContext.Consumer>
    </IconPickerProvider>
  );
};
