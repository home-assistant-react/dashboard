import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/effect-cards";
import { useGetAuthApiClient } from "@home-assistant-react/hooks/src/useGetAuthApiClient";
import { initI18n } from "@home-assistant-react/helpers/src/i18n/init-i18n";
import { en } from "../locales/en";
import { AppProviders } from "./AppProviders";
import { DashboardLoader } from "./dashboard/DashboardLoader";
import { ErrorBoundary } from "./ErrorBoundary";
import { Toasts } from "@home-assistant-react/ui/src";
import { FullPageLoading } from "./FullPageLoading";
import { HassLogin } from "./auth/HassLogin";

initI18n(["it", "en"], {
  it: {},
  en,
}).then();

export const App = () => {
  const { needAuth, apiClientRef, isLoaded } = useGetAuthApiClient();

  if (!needAuth && (!apiClientRef.current || !isLoaded))
    return <FullPageLoading />;

  return (
    <ErrorBoundary>
      <AppProviders apiClientRef={apiClientRef}>
        {needAuth ? <HassLogin /> : <DashboardLoader />}
        <Toasts />
      </AppProviders>
    </ErrorBoundary>
  );
};
