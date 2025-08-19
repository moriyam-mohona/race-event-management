"use client";

import UploadedRaceReport from "./UploadedRaceReport";
import UserActivitiesReports from "./UserActivitiesReports";
import OverRevenueInsight from "./OverRevenueInsight";

const Graphs = () => {
  return (
    <div className="">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-medium">Event Analytics</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <UploadedRaceReport />
        <UserActivitiesReports />
      </div>
      <OverRevenueInsight />
    </div>
  );
};

export default Graphs;
