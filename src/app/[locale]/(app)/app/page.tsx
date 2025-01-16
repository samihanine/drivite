import { AppContainer } from "@/components/app-container";
import { Typography } from "@/components/typography";
import ConsultantDashboard from "@/features/consultant/components/consultant-dashboard";
import { getConsultantByUserId } from "@/features/consultant/queries/get-consultant-by-user-id";
import { getConsultants } from "@/features/consultant/queries/get-consultants";
import CustomerDashboard from "@/features/customer/components/customer-dashboard";
import { getCustomerByUserId } from "@/features/customer/queries/get-customer-by-user-id";
import { getInspections } from "@/features/inspection/queries/get-inspections";
import { getInspectionsByConsultantId } from "@/features/inspection/queries/get-inspections-by-consultant-id";
import AdminDashboard from "@/features/user/components/admin-dashboard";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { getUsers } from "@/features/user/queries/get-users";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  if (user.role === "ADMINISTRATOR") {
    const users = await getUsers();
    const inspections = await getInspections();
    const consultants = await getConsultants();

    return (
      <AdminDashboard
        users={users}
        inspections={inspections}
        consultants={consultants}
      />
    );
  }

  if (user.role === "CONSULTANT") {
    const consultant = await getConsultantByUserId(user.id);

    if (!consultant) {
      return redirect("/onboarding");
    }

    if (!consultant.isVerifiedByAdmin) {
      return (
        <AppContainer className="mt-20 flex justify-center items-center flex-col gap-5">
          <Typography variant="lead" className="text-red-500">
            Votre compte n&apos;est pas encore validé par un administrateur.
          </Typography>
          <Typography variant="lead" className="text-red-500">
            Merci de patienter.
          </Typography>
        </AppContainer>
      );
    }

    const inspections = await getInspectionsByConsultantId(consultant.id);

    return (
      <ConsultantDashboard inspections={inspections} consultant={consultant} />
    );
  }

  if (user.role === "CUSTOMER") {
    const customer = await getCustomerByUserId(user.id);

    if (!customer) {
      return redirect("/onboarding");
    }

    return <CustomerDashboard customer={customer} />;
  }

  return redirect("/onboarding");
}
