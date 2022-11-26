import { Driver } from "../server/trpc/router/driver";

export function getDriverName(driver: Driver | undefined): string {
  return driver ? `${driver?.givenName} ${driver?.familyName}` : "";
}
