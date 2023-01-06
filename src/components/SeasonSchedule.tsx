import { GrandPrixWeekend } from "../server/trpc/router/grandPrix";

interface SeasonScheduleProps {
  schedule: GrandPrixWeekend[] | undefined;
  showDates: boolean;
}

const SeasonSchedule = (props: SeasonScheduleProps) => {
  if (!props.schedule) {
    return null;
  }

  return (
    <div>
      {props.schedule?.map((weekend: GrandPrixWeekend) => {
        return (
          <div key={weekend.round}>
            <span>{weekend.raceName}</span>
            {props.showDates && <span>{weekend.date}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default SeasonSchedule;
