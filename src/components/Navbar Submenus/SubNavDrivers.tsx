import React from "react";
import { trpc } from "../../utils/trpc";
import DriverLink from "../Links/DriverLink";

const SubNavDrivers = () => {
  const { data: currentDrivers } = trpc.home.getCurrentDrivers.useQuery();

  if (!currentDrivers) {
    return null;
  }

  return (
    <ul>
      {currentDrivers.map((driver) => {
        return (
          <li key={driver.driverId}>
            <DriverLink driver={driver} />
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavDrivers;
