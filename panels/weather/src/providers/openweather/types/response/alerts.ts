/* FROM https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/types/response/alerts.ts */
/**
 * National weather alerts data from major national weather warning systems
 */
export interface Alert {
  /**
   * Name of the alert source.
   *
   * Please read the {@link https://openweathermap.org/api/one-call-api#listsource | full list} of sources.
   */
  sender_name: string;

  /**
   * Alert event name.
   */
  event: string;

  /**
   * Date and time of the start of the alert, Unix, UTC.
   */
  start: number;

  /**
   * Date and time of the end of the alert, Unix, UTC.
   */
  end: number;

  /**
   *  Description of the alert.
   */
  description: string;
}
