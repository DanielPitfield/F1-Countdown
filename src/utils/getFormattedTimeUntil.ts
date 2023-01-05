import intervalToDuration from "date-fns/intervalToDuration";

// Instead of displaying 6:9:23, make sure to display 06:09:23
function zeroPad(timeUnit: number | undefined) {
  return timeUnit?.toString().padStart(2, "0");
}

export function getFormattedTimeUntil(endDate: Date | null): string {
  if (!endDate) {
    return "-";
  }

  const now = new Date();

  const duration = intervalToDuration({
    start: now,
    end: endDate,
  });

  return `
  ${zeroPad(duration.weeks)}:
  ${zeroPad(duration.days)}:
  ${zeroPad(duration.hours)}:
  ${zeroPad(duration.minutes)}:
  ${zeroPad(duration.seconds)}
  `;
}
