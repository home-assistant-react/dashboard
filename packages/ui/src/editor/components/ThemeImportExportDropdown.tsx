import { useApi } from "@home-assistant-react/api/src";
import { logError } from "@home-assistant-react/helpers/src";
import { ThemeStyles } from "@home-assistant-react/types/src";
import React, { useId } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components";
import { Icon } from "../../primitives/Icon";

export interface ThemeImportExportDropdownProps {
  currentStyles?: ThemeStyles;
  setStyles: React.Dispatch<React.SetStateAction<ThemeStyles[]>>;
  customStyles: ThemeStyles[];
}

export const ThemeImportExportDropdown: React.FC<
  ThemeImportExportDropdownProps
> = (props) => {
  const { currentStyles, setStyles, customStyles } = props;

  const id = useId();
  const api = useApi();
  const exportTheme = () => {
    api.downloadJsonFile(currentStyles || {}, "theme.json.theme").then();
  };

  const handleInputOnChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = (event.target as HTMLInputElement).files![0];
    event.currentTarget.value = "";

    if (!file) return;
    // read json from file
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      try {
        const theme = JSON.parse(text);

        const hasTheme = customStyles.some(
          (cTheme) => cTheme.theme === theme.theme,
        );

        if (!hasTheme) {
          setStyles((prev) => {
            return [...prev, theme];
          });
          return;
        }

        setStyles((prev) => {
          return prev.map((t) => {
            if (t.theme === theme.theme) {
              return theme;
            }
            return t;
          });
        });
      } catch (e) {
        logError(e);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        id={id}
        className={"hidden w-1 h-1 cursor-pointer hover:cursor-pointer"}
        accept={".theme"}
        onChange={handleInputOnChange}
      />
      <DropdownMenu key={"more-options-menu"}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 w-10 p-0 mx-2">
            <span className="sr-only">Open menu</span>
            <Icon name={"EllipsisVertical"} size={4} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent forceMount align="end">
          <DropdownMenuItem
            className={"relative"}
            onClick={() => {
              (
                window.document?.querySelector(`#${id}`) as HTMLInputElement
              )?.click();
            }}
          >
            Import theme
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportTheme}>
            Export theme
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
