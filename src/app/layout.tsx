import "./globals.scss";

import Navbar from "../components/Navbar";
import { getCurrentCircuits } from "../utils/serverActions/home/getCurrentCircuits";
import { getCurrentDrivers } from "../utils/serverActions/home/getCurrentDrivers";
import { getCurrentTeams } from "../utils/serverActions/home/getCurrentTeams";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Cached but may wish to the use the upcoming "use cache" directive (just to make sure)
  const [currentDrivers, currentTeams, currentCircuits] = await Promise.all([
    getCurrentDrivers(),
    getCurrentTeams(),
    getCurrentCircuits(),
  ]);

  return (
    <html lang="en">
      <body>
        <>
          <Navbar currentDrivers={currentDrivers} currentTeams={currentTeams} currentCircuits={currentCircuits} />
          <main>{children}</main>
        </>
      </body>
    </html>
  );
}
