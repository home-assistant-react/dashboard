import { GoogleIntegrationLoginModal } from "../integration-modals";
import { GoogleIntegrationLabel } from "./CloudApiTargetSelector/GoogleIntegrationLabel";
import { GoogleIntegrationSelectItem } from "./CloudApiTargetSelector/GoogleIntegrationSelectItem";

export const cloudApiIntegrationComponents = {
  google: {
    name: "Google",
    selectItem: GoogleIntegrationSelectItem,
    loginModal: GoogleIntegrationLoginModal,
    label: GoogleIntegrationLabel,
  },
};
