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
  const duration = intervalToDuration({
    start: now,
    end: endDate,
  });

  // More than a week (only show days)
  if (daysDifference > 7) {
    return `${daysDifference} days`;
  }

  // More than a day (only show days and hours)
  if (duration.days !== undefined && duration.days >= 1) {
    return [
      duration.days !== undefined ? `${duration.days} days` : "",
      duration.hours !== undefined && duration.hours >= 1 ? `${duration.hours} hours` : "",
    ]
      .filter((part) => part)
      .join(" ");
  }

  // Less than a day (only show hours and minutes)
  if (duration.days !== undefined && duration.days < 1) {
    return [
      duration.hours !== undefined ? `${duration.hours} hours` : "",
      duration.minutes !== undefined && duration.minutes >= 1 ? `${duration.minutes} minutes` : "",
    ]
      .filter((part) => part)
      .join(" ");
  }

  // Less than an hour (only show minutes and seconds)
  if (duration.hours !== undefined && duration.hours < 1) {
    return [
      duration.minutes !== undefined ? `${duration.minutes} minutes` : "",
      duration.seconds !== undefined && duration.seconds >= 1
        ? `${zeroPad(duration.seconds)} seconds`
        : "",
    ]
      .filter((part) => part)
      .join(" ");
  }

  // Less than a minute (show seconds in uppercase)
  if (duration.minutes !== undefined && duration.minutes < 1) {
    return `${duration.seconds}`.toUpperCase();
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
