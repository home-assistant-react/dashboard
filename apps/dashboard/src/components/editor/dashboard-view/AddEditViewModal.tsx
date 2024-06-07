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
import { ViewForm, ViewFormData } from "./ViewForm";

export interface AddEditViewModal extends ModalProps {
  viewId?: string;
  onSaved?: () => void;
  onCancel?: () => void;
  onDeleted?: () => void;
}

export const AddEditViewModal: React.FC<AddEditViewModal> = ({
  viewId,
  onSaved,
  onCancel,
  onDeleted,
  ...props
}) => {
  const dashboard = useDashboard();
  const { deleteView } = useDashboardEditor();
  const view = React.useMemo(() => {
    if (!viewId) return undefined;
    return dashboard.views.find((view) => view.id === viewId);
  }, [sanitizeDep(dashboard.views), viewId]);
  const form = useForm<ViewFormData>({
    defaultValues: {
      order: 0,
    },
  });
  const { wrapApiRequest, isLoading } = useStandardApiHandler();

  const handleSubmit = form.handleSubmit(
    wrapApiRequest(async (data) => {
      if (view && viewId) {
        if (String(data.gridPaddingHorizontal) === "")
          data.gridPaddingHorizontal = undefined;
        if (String(data.gridPaddingVertical) === "")
          data.gridPaddingVertical = undefined;
        if (String(data.gridGapHorizontal) === "")
          data.gridGapHorizontal = undefined;
        if (String(data.gridGapVertical) === "")
          data.gridGapVertical = undefined;
        dashboard.updateView({ ...data, id: viewId });
        onSaved?.();
        return;
      }
      dashboard.addView(data);
      onSaved?.();
    }),
  );

  React.useEffect(() => {
    form.reset(props.isOpen ? view : {});
  }, [props.isOpen, sanitizeDep(view)]);

  return (
    <Modal title={view ? "View settings" : "Add new view"} {...props}>
      <FormWrapper isLoading={isLoading} onSubmit={handleSubmit}>
        <ViewForm form={form} />
        <Flex className={"justify-between"}>
          <Flex className={"gap-2"}>
            {!!view && (
              <Button
                variant={"destructive"}
                icon={"Trash"}
                onClick={() => {
                  if (view)
                    deleteView(view, {
                      onConfirm: () => {
                        onDeleted?.();
                      },
                    });
                }}
              >
                Delete view
              </Button>
            )}
            {onCancel && (
              <Button variant={"outline"} onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Flex>
          <FormSubmit label={view ? "Save changes" : "Create"} />
        </Flex>
      </FormWrapper>
    </Modal>
  );
};
