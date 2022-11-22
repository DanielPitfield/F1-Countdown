import { DriverInfo } from "../server/trpc/router/driver";

export function getDriverName(driver: DriverInfo | undefined): string {
  return driver ? `${driver?.givenName} ${driver?.familyName}` : "";
}
