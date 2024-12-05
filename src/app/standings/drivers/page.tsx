import DriverStandings from "../../../components/DriverStandings";
import { getSeasonDriverStandings } from "../../../utils/serverActions/season/getSeasonDriverStandings";

export default async function Page() {
  const driverStandings = await getSeasonDriverStandings({ seasonID: "current" });

  return (
    <>
      <h1>Driver Standings</h1>
      <DriverStandings standings={driverStandings} />
    </>
  );
}
