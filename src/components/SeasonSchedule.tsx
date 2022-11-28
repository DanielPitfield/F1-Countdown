import { Race } from "../server/trpc/router/grandPrix";

interface SeasonScheduleProps {
  schedule: Race[] | undefined;
  showDates: boolean;
}

const SeasonSchedule = (props: SeasonScheduleProps) => {
  if (!props.schedule) {
    return null;
  }

  return (
    <div>
      {props.schedule?.map((race: Race) => {
        return (
          <div key={race.round}>
            <span>{race.raceName}</span>
            {props.showDates && <span>{race.date}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default SeasonSchedule;
