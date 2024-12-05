import { Driver } from "./types/Driver";

export function getDriverName(driver: Driver | undefined): string {
  return driver ? `${driver?.givenName} ${driver?.familyName}` : "";
}
