import { useApi, useHass } from "@home-assistant-react/api/src";
import { useTranslation } from "@home-assistant-react/helpers/src/i18n/useTranslation";
import { useDisclosure } from "@home-assistant-react/hooks/src";
import useGetDataOrDefaults from "@home-assistant-react/hooks/src/useGetDataOrDefaults";
import { DashboardsListItem } from "@home-assistant-react/types/src/api/dashboards";
import { Box, Button, Flex } from "@home-assistant-react/ui/src";
import { FullPageContainer } from "@home-assistant-react/ui/src/components/containers/FullPageContainer";
import { Divider } from "@home-assistant-react/ui/src/components/data-display/Divider";
import { Heading } from "@home-assistant-react/ui/src/components/data-display/Heading";
import { ConfirmModal } from "@home-assistant-react/ui/src/components/modals/ConfirmModal";
import { Modal } from "@home-assistant-react/ui/src/components/modals/Modal/Modal";
import React from "react";
import { FullPageLoading } from "../FullPageLoading";
import { DashboardSelectorItem } from "./DashboardSelectorItem";
import { NewDashboardForm } from "./NewDashboardForm";

export const DashboardSelector = () => {
  const { t } = useTranslation("onboarding");
  const { currentUser, setSelectedDashboard: setHassDashboard } = useHass();
  const confirmDisclosure = useDisclosure();
  const newDashboardDisclosure = useDisclosure();
  const [selectedDashboard, setSelectedDashboard] =
    React.useState<DashboardsListItem | null>(null);
  const api = useApi();

  const {
    data: availableDashboards,
    refresh: refreshDashboards,
    isLoading,
  } = useGetDataOrDefaults(async () => {
    return (await api.getAvailableDashboards())?.dashboards || [];
  });

  const hasDashboards = (availableDashboards?.length || 0) > 0;

  return (
    <FullPageContainer>
      {isLoading || !currentUser?.id ? (
        <FullPageLoading />
      ) : (
        <Box className={"my-10 mb-10 margin-auto"}>
          <Flex className={"flex-col gap-6 w-full max-w-[500px] m-auto"}>
            <Heading>{t("helloHeading", { name: currentUser?.name })}</Heading>
            <Box className={"text-muted-foreground"}>
              {hasDashboards
                ? t("helloCopyWithDashboards", {
                    count: availableDashboards?.length,
                  })
                : t("helloCopyNoDashboards")}
            </Box>
            {!hasDashboards ? (
              <Box className={"w-full"}>
                <NewDashboardForm
                  onSubmit={async (data) => {
                    await api.createDashboard(data);
                    await refreshDashboards();
                  }}
                />
              </Box>
            ) : (
              <Button
                size={"xl"}
                icon={"Plus"}
                onClick={newDashboardDisclosure.onOpen}
              >
                {t("addNewDashboardButton")}
              </Button>
            )}
            {hasDashboards && <Divider />}
            {availableDashboards?.map((dashboard) => (
              <DashboardSelectorItem
                key={dashboard.id}
                dashboard={dashboard}
                onClick={() => {
                  confirmDisclosure.onOpenChange(true);
                  setSelectedDashboard(dashboard);
                }}
              />
            ))}
          </Flex>
        </Box>
      )}
      <ConfirmModal
        isOpen={confirmDisclosure.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedDashboard(null);
          }
          confirmDisclosure.onOpenChange(isOpen);
        }}
        title={
          selectedDashboard
            ? t("selectDashboardConfirmTitle", {
                name: selectedDashboard.name,
              })
            : ""
        }
        message={
          selectedDashboard
            ? t("selectDashboardConfirmMessage", {
                name: selectedDashboard.name,
              })
            : ""
        }
        onConfirm={() => {
          if (!selectedDashboard?.id) return;
          confirmDisclosure.onClose();
          setHassDashboard?.(selectedDashboard?.id, true);
        }}
      />
      <Modal
        isOpen={newDashboardDisclosure.isOpen}
        onOpenChange={newDashboardDisclosure.onOpenChange}
        title={t("createNewDashboardModalTitle")}
      >
        <NewDashboardForm
          onSubmit={async (data) => {
            await api.createDashboard(data);
            await refreshDashboards();
            newDashboardDisclosure.onClose();
          }}
        />
      </Modal>
    </FullPageContainer>
  );
};
