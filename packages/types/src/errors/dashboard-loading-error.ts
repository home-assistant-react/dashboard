export class DashboardLoadingError extends Error {
  public showResetConfiguration: boolean;
  public reason?: string;

  constructor(props: {
    message: string;
    reason?: unknown;
    showResetConfiguration?: boolean;
  }) {
    super(props.message);
    this.showResetConfiguration = props.showResetConfiguration || false;
    this.reason = props.reason as string;
    Object.setPrototypeOf(this, DashboardLoadingError.prototype);
  }
}
