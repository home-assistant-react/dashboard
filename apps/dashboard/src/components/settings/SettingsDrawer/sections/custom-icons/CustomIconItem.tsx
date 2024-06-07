import { useBooleanValue } from "@home-assistant-react/hooks/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { CustomSvgIcon } from "@home-assistant-react/types/src";
import {
  Box,
  Button,
  CustomSvgIcon as CustomSvgIconComponent,
  Flex,
} from "@home-assistant-react/ui/src";
import { FormSubmit } from "@home-assistant-react/ui/src/form/FormSubmit";
import { FormWrapper } from "@home-assistant-react/ui/src/form/FormWrapper";
import { TextInput } from "@home-assistant-react/ui/src/form/TextInput";
import React from "react";

export const CustomIconItem = ({
  icon,
  onDelete,
  onRename,
}: {
  icon: CustomSvgIcon;
  onDelete: (iconId: string) => void;
  onRename: (iconId: string, newName: string) => void;
}) => {
  const isEditOpen = useBooleanValue();
  const [inputName, setInputName] = React.useState(icon.icon_name);
  return (
    <Flex
      className={
        "group p-5 gap-3 rounded overflow-hidden items-center justify-between h-[72px] hover:bg-accent hover:cursor-pointer"
      }
      data-icon-id={icon.id}
    >
      <Box>
        <CustomSvgIconComponent icon={icon} width={32} height={32} />
      </Box>
      {!isEditOpen.value && (
        <Box className={"w-full text-center"} onClick={isEditOpen.setTrue}>
          {icon.icon_name}
        </Box>
      )}
      <Box>
        {!isEditOpen.value ? (
          <Button
            className={"opacity-0 group-hover:opacity-100"}
            variant={"ghost"}
            onClick={onDelete.bind(null, icon.id)}
          >
            {getMdiIcon("trashCan")}
          </Button>
        ) : (
          <FormWrapper>
            <Flex className={"gap-1 items-stretch"}>
              <TextInput
                value={inputName}
                onChange={(e) => setInputName(e.currentTarget.value)}
                hideEmptyMessages
              />
              <FormSubmit
                className={"h-auto"}
                variant={"destructive"}
                icon={"Check"}
                onClick={() => {
                  onRename(icon.id, inputName);
                  isEditOpen.setFalse();
                }}
              />
              <Button
                variant={"outline"}
                className={"h-auto"}
                icon={"X"}
                onClick={isEditOpen.setFalse}
              />
            </Flex>
          </FormWrapper>
        )}
      </Box>
    </Flex>
  );
};
