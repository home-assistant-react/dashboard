import { useDashboardEditor } from "@home-assistant-react/api/src";
import { Button, Flex } from "@home-assistant-react/ui/src";
import { Heading } from "@home-assistant-react/ui/src/components/data-display/Heading";

const classes = {
  Wrapper: "absolute inset-0 items-center justify-center flex-col gap-6",
};

export const NoViewsOnboarding = () => {
  const { editorModalDisclosure } = useDashboardEditor();
  return (
    <Flex className={classes.Wrapper}>
      <Heading as={"h4"}>Add your first view on this dashboard!</Heading>
      <Flex>
        <Button
          size={"xl"}
          icon={"Plus"}
          onClick={() => {
            editorModalDisclosure.open({ modal: "view" });
          }}
        >
          Add view
        </Button>
      </Flex>
    </Flex>
  );
};
