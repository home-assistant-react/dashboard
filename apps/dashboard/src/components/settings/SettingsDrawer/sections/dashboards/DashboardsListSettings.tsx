import { useApi, useHass } from "@home-assistant-react/api/src";
import { formatDateYYMMDD } from "@home-assistant-react/helpers/src/dates/formatDateYYMMDD";
import { useTranslation } from "@home-assistant-react/helpers/src/i18n/useTranslation";
import { useDisclosure } from "@home-assistant-react/hooks/src";
import useGetDataOrDefaults from "@home-assistant-react/hooks/src/useGetDataOrDefaults";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import { DashboardsListItem } from "@home-assistant-react/types/src/api/dashboards";
import {
  Box,
  Button,
  DeleteConfirmModal,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
} from "@home-assistant-react/ui/src";
import { DataTable } from "@home-assistant-react/ui/src/components/data-display/DataTable";
import { ConfirmModal } from "@home-assistant-react/ui/src/components/modals/ConfirmModal";
import { Modal } from "@home-assistant-react/ui/src/components/modals/Modal/Modal";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NewDashboardForm } from "../../../../onboarding/NewDashboardForm";

export const DashboardsListSettings: React.FC = () => {
  const { t } = useTranslation("onboarding");
  const { selectedDashboard, setSelectedDashboard } = useHass();
  const newDashboardDisclosure = useDisclosure();
  const api = useApi();
  const { data: dashboards, refresh: refreshDashboards } = useGetDataOrDefaults(
    async () => {
      return await api.getAvailableDashboards();
    },
  );
  const { wrapApiRequest } = useStandardApiHandler();
  const confirmDisclosure = useDisclosure<DashboardsListItem>();
  const confirmDeleteDisclosure = useDisclosure<DashboardsListItem>();

  const handleDeleteDashboard = wrapApiRequest(
    async (dashboardItem?: DashboardsListItem) => {
      if (!dashboardItem) return;
      await api.deleteDashboard(dashboardItem.id);
      await refreshDashboards();
      confirmDeleteDisclosure.close();
    },
    "Integration deleted",
  );

  return (
    <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
      <Box className={"px-10 pb-10"}>
        <Flex className={"justify-end py-2"}>
          <Button
            variant={"outline"}
            icon={"Plus"}
            onClick={() => {
              newDashboardDisclosure.onOpen();
            }}
          >
            Add dashboard
          </Button>
        </Flex>
        <DataTable
          columns={[
            {
              accessorKey: "id",
              header: "Selected",
              cell: ({ row }) => {
                return row.original.id === selectedDashboard ? (
                  <Flex
                    className={
                      "w-full justify-center text-semantic-success-foreground"
                    }
                  >
                    <Icon name={"Check"} size={4} />
                  </Flex>
                ) : null;
              },
            },
            {
              accessorKey: "id",
              header: "ID",
            },
            {
              accessorKey: "name",
              header: "Name",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
            {
              accessorKey: "createdAt",
              header: "Created at",
              cell: ({ getValue }) => {
                return getValue() ? formatDateYYMMDD(getValue() as string) : "";
              },
            },
            {
              accessorKey: "updatedAt",
              header: "Updated at",
              cell: ({ getValue }) => {
                return getValue() ? formatDateYYMMDD(getValue() as string) : "";
              },
            },
            {
              id: "actions",
              cell: ({ row }) => {
                return (
                  <Flex className={"justify-end w-full"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <Icon name={"EllipsisVertical"} size={4} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          disabled={row.original.id === selectedDashboard}
                          onClick={() => {
                            confirmDisclosure.open(row.original);
                          }}
                        >
                          Make active
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          disabled={row.original.id === selectedDashboard}
                          onClick={() => {
                            confirmDeleteDisclosure.open(row.original);
                          }}
                        >
                          Delete dashboard
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Flex>
                );
              },
            },
          ]}
          data={dashboards?.dashboards || []}
        />
      </Box>
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
      <ConfirmModal
        isOpen={confirmDisclosure.isOpen}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            return;
          }
          confirmDisclosure.onOpenChange(isOpen);
        }}
        title={
          selectedDashboard
            ? t("selectDashboardConfirmTitle", {
                name: confirmDisclosure.data?.name,
              })
            : ""
        }
        message={
          selectedDashboard
            ? t("selectDashboardConfirmMessage", {
                name: confirmDisclosure.data?.name,
              })
            : ""
        }
        onConfirm={() => {
          if (!confirmDisclosure?.data?.id) return;
          confirmDisclosure.onClose();
          setSelectedDashboard?.(confirmDisclosure?.data?.id, true);
        }}
      />
      <DeleteConfirmModal
        onConfirm={() => handleDeleteDashboard(confirmDeleteDisclosure.data)}
        title={"Do you really want to delete this dashboard?"}
        message={
          <>
            You will lose all the data you have set for this dashboard.
            <br />
            <strong>This action cannot be undone.</strong>
          </>
        }
        confirmText={`DELETE DASHBOARD ${confirmDeleteDisclosure.data?.name}`}
        isOpen={confirmDeleteDisclosure.isOpen}
        onOpenChange={confirmDeleteDisclosure.setOpen}
      />
    </Scrollbars>
  );
};
