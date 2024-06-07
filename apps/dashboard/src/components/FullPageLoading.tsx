import { Spinner } from "@home-assistant-react/ui/src/components/feedback/Spinner";
import React from "react";
import { Flex } from "@home-assistant-react/ui/src";

const classes = {
  Loader: "w-screen h-screen items-center justify-center",
};

export const FullPageLoading: React.FC = () => {
  return (
    <Flex className={classes.Loader}>
      <Spinner
        className={
          "w-20 h-20 fill-primary-background/50 text-primary-background/10"
        }
      />
    </Flex>
  );
};
