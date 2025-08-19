import VendorActivitiesReports from "@/components/dashboard/VendorDashboard/VendorDashboardRoot/VendorActivitiesReports";
import VendorCardInfo from "@/components/dashboard/VendorDashboard/VendorDashboardRoot/VendorDashboardCard";
import VendorPieChart from "@/components/dashboard/VendorDashboard/VendorDashboardRoot/VendorPieChart";
import VendorRevenuePerMonth from "@/components/dashboard/VendorDashboard/VendorDashboardRoot/VendorRevenuePerMonth";

const Dashboard = () => {
  return (
    <div>
      <VendorCardInfo />
      <div className="">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-medium">Event Analytics</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <VendorPieChart />
          <VendorActivitiesReports />
        </div>
        <VendorRevenuePerMonth />
      </div>
    </div>
  );
};

export default Dashboard;
