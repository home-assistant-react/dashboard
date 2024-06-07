import { useTranslation } from "@home-assistant-react/helpers/src/i18n/useTranslation";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import { FormSubmit } from "@home-assistant-react/ui/src/form/FormSubmit";
import { FormWrapper } from "@home-assistant-react/ui/src/form/FormWrapper";
import { HookFormTextAreaInput } from "@home-assistant-react/ui/src/form/TextAreaInput";
import { HookFormTextInput } from "@home-assistant-react/ui/src/form/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

export interface NewDashboardFormData {
  name: string;
  description: string;
}

export interface NewDashboardFormProps {
  onSubmit: (data: NewDashboardFormData) => Promise<void>;
}

export const NewDashboardForm: React.FC<NewDashboardFormProps> = ({
  onSubmit,
}) => {
  const { t } = useTranslation("dashboardCreation");
  const form = useForm<NewDashboardFormData>();
  const { wrapApiRequest, isLoading } = useStandardApiHandler();

  const handleSubmit = form.handleSubmit(
    wrapApiRequest(async (data) => {
      await onSubmit(data);
    }),
  );

  return (
    <FormWrapper onSubmit={handleSubmit} isLoading={isLoading}>
      <HookFormTextInput
        form={form}
        name={"name"}
        label={t("dashboardNameInputLabel")}
        placeholder={t("dashboardNameInputPlaceholder")}
        isRequired
      />
      <HookFormTextAreaInput
        form={form}
        name={"description"}
        label={t("dashboardDescriptionInputLabel")}
        helperText={t("dashboardDescriptionInputHelperText")}
        isOptional
      />
      <FormSubmit className={"w-full"} size={"xl"}>
        {t("createNewDashboardButton")}
      </FormSubmit>
    </FormWrapper>
  );
};
