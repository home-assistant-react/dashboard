import {
  useDashboard,
  useDashboardEditor,
} from "@home-assistant-react/api/src";
import { sanitizeDep } from "@home-assistant-react/helpers/src/ui/sanitizeDep";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import { Button, Flex } from "@home-assistant-react/ui/src";
import { ModalProps } from "@home-assistant-react/ui/src/components/modals/Modal";
import { Modal } from "@home-assistant-react/ui/src/components/modals/Modal/Modal";
import { FormSubmit } from "@home-assistant-react/ui/src/form/FormSubmit";
import { FormWrapper } from "@home-assistant-react/ui/src/form/FormWrapper";
import React from "react";
import { useForm } from "react-hook-form";
import { SidebarForm, SidebarFormData } from "./SidebarForm";

export interface AddEditSidebarModal extends ModalProps {
  sidebarId?: string;
  onSaved?: () => void;
  onCancel?: () => void;
  onDeleted?: () => void;
}

export const AddEditSidebarModal: React.FC<AddEditSidebarModal> = ({
  sidebarId,
  onSaved,
  onCancel,
  onDeleted,
  ...props
}) => {
  const dashboard = useDashboard();
  const { deleteSidebar } = useDashboardEditor();
  const sidebar = React.useMemo(() => {
    return dashboard.sidebars.find((sidebar) => sidebar.id === sidebarId);
  }, [sanitizeDep(dashboard.sidebars), sidebarId]);
  const form = useForm<SidebarFormData>({
    defaultValues: {
      position: "left",
      order: 0,
      size: 25,
    },
  });
  const { wrapApiRequest, isLoading } = useStandardApiHandler();

  const handleSubmit = form.handleSubmit(
    wrapApiRequest(async (data) => {
      if (sidebar) {
        dashboard.updateSidebar({ ...data, id: sidebarId });
        onSaved?.();
        return;
      }
      dashboard.addSidebar(data);
      onSaved?.();
    }),
  );

  React.useEffect(() => {
    form.reset(props.isOpen ? sidebar : {});
  }, [props.isOpen, sidebar]);

  return (
    <Modal title={sidebar ? "Sidebar settings" : "Add new sidebar"} {...props}>
      <FormWrapper isLoading={isLoading} onSubmit={handleSubmit}>
        <SidebarForm form={form} />
        <Flex className={"justify-between"}>
          <Flex className={"gap-2"}>
            {!!sidebar && (
              <Button
                variant={"destructive"}
                icon={"Trash"}
                onClick={() => {
                  deleteSidebar(sidebar.id, {
                    onConfirm: () => {
                      onDeleted?.();
                    },
                  });
                }}
              >
                Delete sidebar
              </Button>
            )}
            {onCancel && (
              <Button variant={"outline"} onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Flex>
          <FormSubmit label={sidebar ? "Save changes" : "Create"} />
        </Flex>
      </FormWrapper>
    </Modal>
  );
};
