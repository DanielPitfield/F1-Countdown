import { intervalToDuration, differenceInCalendarDays } from "date-fns";

// Instead of displaying 6:9:23, make sure to display 06:09:23
function zeroPad(timeUnit: number | undefined) {
  return timeUnit?.toString().padStart(2, "0");
}

export function getFormattedTimeUntil(endDate: Date | null): string {
  if (!endDate) {
    return "-";
  }

  const now = new Date();

  // How long between now and the specified end date (detailed Duration object)?
  const duration = intervalToDuration({
    start: now,
    end: endDate,
  });

  // How many days between now and the specified end date?
  const daysDifference = differenceInCalendarDays(endDate, now);

  // More than a week (only show days)
  if (daysDifference > 7) {
    return `${daysDifference} days`;
  }

  // More than a day (only show days and hours)
  if (duration.days) {
    return [
      `${duration.days} day${duration.days > 1 ? "s" : ""}`,
      duration.hours ? `${duration.hours} hour${duration.hours > 1 ? "s" : ""}` : "",
    ]
      .filter((part) => part)
      .join(" ");
  }

  // More than an hour (only show hours and minutes)
  if (duration.hours) {
    return [
      `${duration.hours} hour${duration.hours > 1 ? "s" : ""}`,
      duration.minutes ? `${duration.minutes} minute${duration.minutes > 1 ? "s" : ""}` : "",
    ]
      .filter((part) => part)
      .join(" ");
  }

  // More than a minute (only show minutes and seconds)
  if (duration.minutes) {
    return [
      `${duration.minutes} minute${duration.minutes > 1 ? "s" : ""}`,
      duration.seconds ? `${zeroPad(duration.seconds)} second${duration.seconds > 1 ? "s" : ""}` : "",
    ]
      .filter((part) => part)
      .join(" ");
  }

  // More than a second (only show seconds)
  if (duration.seconds) {
    return `${duration.seconds}`.toUpperCase();
  }

  // Not even 1 or more seconds, so is likely starting or has started now
  if (duration.seconds !== undefined) {
    return "Starting...";
  }

  // Otherwise, a concatenated string of the parts of the duration which are not undefined
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
