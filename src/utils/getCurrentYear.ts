import { getYear } from "date-fns";

export function getCurrentYear(): number {
  return getYear(new Date());
}
