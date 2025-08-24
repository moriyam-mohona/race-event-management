import CommunityList from "@/components/pages/community/CommunityList/CommunityList";
import WithRole from "@/role-wrapper/WithRole";

const Community = () => {
  return (
    <WithRole allowedRoles={["USER"]}>
      <div className="mt-24 lg:mt-40 container mx-auto max-w-[1320px] px-4">
        <CommunityList />
      </div>
    </WithRole>
  );
};

export default Community;
