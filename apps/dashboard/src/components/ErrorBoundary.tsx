/* Import only the bare minimum to avoid the boundary not able to catch errors */
import { logError } from "@home-assistant-react/helpers/src/console/logError";
import { DashboardLoadingError } from "@home-assistant-react/types/src/errors";
import React from "react";

const classes = {
  Wrapper:
    "flex w-full min-h-screen items-center justify-center p-10 text-2xl flex-col gap-10 overflow-auto bg-gray-800",
  Heading: "text-semantic-error-foreground text-3xl",
  Button: "bg-semantic-error-foreground text-white px-4 py-2 rounded",
  ButtonOutline:
    "border border-semantic-error-foreground text-semantic-error-foreground px-4 py-2 rounded",
  Message: "text-white",
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError("Error caught by ErrorBoundary:", error, errorInfo);
  }

  reloadPage = () => {
    location.reload();
  };

  shouldShowResetConfiguration() {
    if (this.state.error instanceof DashboardLoadingError) {
      return this.state.error.showResetConfiguration;
    }

    return false;
  }

  getErrorReason() {
    if (this.state.error instanceof DashboardLoadingError) {
      return String(this.state.error.reason);
    }

    return null;
  }

  override render() {
    if (this.state.hasError) {
      const reason = this.getErrorReason();
      return (
        <div className={classes.Wrapper}>
          <h1 className={classes.Heading}>
            {this.state.error?.message || "Something went wrong."}
          </h1>
          {reason && <p className={classes.Message}>{reason}</p>}
          <div className={"flex gap-6"}>
            <button className={classes.Button} onClick={this.reloadPage}>
              Reload
            </button>
            {this.shouldShowResetConfiguration() && (
              <button className={classes.ButtonOutline}>
                Reset configuration
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
