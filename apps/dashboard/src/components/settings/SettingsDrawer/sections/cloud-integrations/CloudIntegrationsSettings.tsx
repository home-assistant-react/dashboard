import { useApi } from "@home-assistant-react/api/src";
import useGetDataOrDefaults from "@home-assistant-react/hooks/src/useGetDataOrDefaults";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
} from "@home-assistant-react/ui/src";
import { cloudApiIntegrationComponents } from "@home-assistant-react/ui/src/components/controls/cloud-api-integrations";
import { CloudApiAddIntegrationButton } from "@home-assistant-react/ui/src/components/controls/CloudApiAddIntegrationButton";
import { DataTable } from "@home-assistant-react/ui/src/components/data-display/DataTable";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export const CloudIntegrationsSettings: React.FC = () => {
  const api = useApi();
  const { data: integrations, refresh: reloadIntegrations } =
    useGetDataOrDefaults(async () => {
      return await api.getAvailableIntegrations();
    });
  const { wrapApiRequest } = useStandardApiHandler();

  const handleDeleteIntegration = wrapApiRequest(
    async (integration: string, integrationId: string) => {
      await api.deleteIntegration(integration, integrationId);
      await reloadIntegrations();
    },
    "Integration deleted",
  );

  return (
    <Scrollbars style={{ height: "100%", flexGrow: 1 }}>
      <Box className={"px-10 pb-10"}>
        <Flex className={"justify-end py-2"}>
          <CloudApiAddIntegrationButton
            onSuccess={() => {
              reloadIntegrations();
            }}
          />
        </Flex>
        <DataTable
          columns={[
            {
              accessorKey: "integration",
              header: "Integration",
              cell: (row) => {
                const Component =
                  row.row.original.integration in cloudApiIntegrationComponents
                    ? cloudApiIntegrationComponents[
                        row.row.original
                          .integration as keyof typeof cloudApiIntegrationComponents
                      ].label
                    : undefined;
                if (!Component) return null;
                return <Component integration={row.row.original} />;
              },
            },
            {
              accessorKey: "auth_key",
              header: "Auth Key",
            },
            {
              accessorKey: "created_at",
              header: "Created At",
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
                          onClick={() => {
                            handleDeleteIntegration(
                              row.original.integration,
                              row.original.auth_key,
                            );
                          }}
                        >
                          Delete integration
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Flex>
                );
              },
            },
          ]}
          data={integrations?.integrations || []}
        />
      </Box>
    </Scrollbars>
  );
};
