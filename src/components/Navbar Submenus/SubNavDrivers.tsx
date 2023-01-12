import React from "react";
import { trpc } from "../../utils/trpc";
import DriverLink from "../Links/DriverLink";

const SubNavDrivers = () => {
  const { data: currentDrivers } = trpc.home.getCurrentDrivers.useQuery();

  if (!currentDrivers) {
    return null;
  }

  return (
    <nav>
      {currentDrivers.map((driver) => {
        return (
          <div key={driver.driverId}>
            <DriverLink driver={driver} />
          </div>
        );
      })}
    </nav>
  );
};

export default SubNavDrivers;
