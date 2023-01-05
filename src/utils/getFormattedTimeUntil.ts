import intervalToDuration from "date-fns/intervalToDuration";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

// Instead of displaying 6:9:23, make sure to display 06:09:23
function zeroPad(timeUnit: number | undefined) {
  return timeUnit?.toString().padStart(2, "0");
}

export function getFormattedTimeUntil(endDate: Date | null): string {
  if (!endDate) {
    return "-";
  }

  const now = new Date();

  const daysDifference = differenceInCalendarDays(endDate, now);

  if (daysDifference > 7) {
    return `${daysDifference} days`;
  }

  const duration = intervalToDuration({
    start: now,
    end: endDate,
  });

  // Return a concatenated string of the parts of the duration which are not undefined
  return [
    duration.months !== undefined ? `${duration.months}m` : "",
    duration.weeks !== undefined ? `${duration.weeks}w` : "",
    duration.days !== undefined ? `${duration.days}d` : "",
    duration.hours !== undefined ? `${zeroPad(duration.hours)}h` : "",
    duration.minutes !== undefined ? `${zeroPad(duration.minutes)}m` : "",
    duration.seconds !== undefined ? `${zeroPad(duration.seconds)}s` : "",
  ]
    .filter((part) => part)
    .join(" ");
}
