import getYear from "date-fns/getYear";

export function getCurrentYear(): string {
  return getYear(new Date()).toString();
}
