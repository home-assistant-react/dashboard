import { useDashboardEditor } from "@home-assistant-react/api/src";
import { useToast } from "@home-assistant-react/hooks/src/useToast";
import React from "react";
import { AddEditSidebarModal } from "./sidebar/AddEditSidebarModal";
import { AddEditViewModal } from "./dashboard-view/AddEditViewModal";

export const DashboardEditorModals: React.FC = () => {
  const { editorModalDisclosure } = useDashboardEditor();
  const openModal = editorModalDisclosure.data?.modal || "";
  const toast = useToast();
  return (
    <>
      <AddEditSidebarModal
        isOpen={editorModalDisclosure.isOpen && openModal === "sidebar"}
        onOpenChange={(isOpen) => {
          if (!isOpen) editorModalDisclosure.onOpenChange(false);
        }}
        sidebarId={editorModalDisclosure.data?.sidebarId}
        onSaved={() => {
          editorModalDisclosure.onOpenChange(false);
          toast.toastSuccess("Sidebar updated");
        }}
        onCancel={() => {
          editorModalDisclosure.onOpenChange(false);
        }}
        onDeleted={() => {
          editorModalDisclosure.onOpenChange(false);
          toast.toastSuccess("Sidebar deleted");
        }}
      />
      <AddEditViewModal
        isOpen={editorModalDisclosure.isOpen && openModal === "view"}
        onOpenChange={(isOpen) => {
          if (!isOpen) editorModalDisclosure.onOpenChange(false);
        }}
        viewId={editorModalDisclosure.data?.viewId}
        onSaved={() => {
          editorModalDisclosure.onOpenChange(false);
          toast.toastSuccess("View updated");
        }}
        onCancel={() => {
          editorModalDisclosure.onOpenChange(false);
        }}
        onDeleted={() => {
          editorModalDisclosure.onOpenChange(false);
          toast.toastSuccess("View deleted");
        }}
      />
    </>
  );
};
