import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";

export function getGrandPrixWeekendSessions(
  weekend: GrandPrixWeekend
): { name: string; date: Date }[] {
  return [
    {
      name: "Free Practice 1",
      date: new Date(
        `${weekend.FirstPractice?.date}${weekend.FirstPractice?.time}`
      ),
    },
    {
      name: "Free Practice 2",
      date: new Date(
        `${weekend.SecondPractice?.date}${weekend.SecondPractice?.time}`
      ),
    },
    {
      name: "Free Practice 3",
      date: new Date(
        `${weekend.ThirdPractice?.date}${weekend.ThirdPractice?.time}`
      ),
    },
    {
      name: "Qualifying",
      date: new Date(`${weekend.Qualifying?.date}${weekend.Qualifying?.time}`),
    },
    { name: "Race", date: new Date(`${weekend.date}${weekend.time}`) },
  ];
}
