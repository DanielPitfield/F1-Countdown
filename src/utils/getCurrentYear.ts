import getYear from "date-fns/getYear";

export function getCurrentYear(): number {
  return getYear(new Date());
}
