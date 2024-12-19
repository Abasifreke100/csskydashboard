/**
 *
 * @param desc a pointer that helps to keep track of the log
 * @param message The info that you want to console
 *  @description Only logs on local development
 */

import { Constants } from "../constants";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logger = (desc: string, ...message: any[]) => {
  if (Constants.isDev) {
    // eslint-disable-next-line no-console
    console.log(`This is ${desc} ==>`, ...message);
  }
};
