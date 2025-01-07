import { AppContainer } from "@/components/app-container";
import { CardStats } from "@/components/card-stats";
import { Consultant, Inspection, User } from "@/db/schemas";
import LastUsersChart from "./last-users-chart";
import LastInspectionList from "./last-inspection-list";

const AdminDashboard = ({
  users,
  inspections,
  consultants,
}: {
  users: User[];
  inspections: Inspection[];
  consultants: Consultant[];
}) => {
  return (
    <AppContainer className="py-20">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <CardStats title="Nombre d'inspections" value={inspections.length} />
          <CardStats title="Nombre d'utilisateurs" value={users.length} />
          <CardStats
            title="Nombre de clients"
            value={users.filter((user) => user.role === "CUSTOMER").length}
          />
          <CardStats
            title="Nombre de consultants"
            value={users.filter((user) => user.role === "CONSULTANT").length}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-[2]">
            <LastUsersChart users={users} />
          </div>

          <div className="flex-1 h-full">
            <LastInspectionList
              inspections={inspections}
              consultants={consultants}
            />
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default AdminDashboard;
