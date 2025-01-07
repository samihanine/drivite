"use client";

import { AppContainer } from "@/components/app-container";
import { Consultant, Inspection } from "@/db/schemas";
import InspectionTable from "../../inspection/components/inspection-table";
import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { createInspection } from "@/features/inspection/actions/create-inspection";
import { useRouter } from "next/navigation";
import { showError } from "@/lib/utils";

const ConsultantDashboard = ({
  inspections,
  consultant,
}: {
  inspections: Inspection[];
  consultant: Consultant;
}) => {
  const { executeAsync, status } = useAction(createInspection);
  const router = useRouter();

  const handleCreateInspection = async () => {
    const result = await executeAsync({ consultantId: consultant.id });

    if (!result?.data?.id) {
      return showError({ message: "Une erreur est survenue" });
    }

    router.push(`/app/inspections/${result?.data.id}`);
  };

  return (
    <AppContainer className="py-20 flex flex-col gap-10">
      <div className="flex justify-between gap-5 flex-wrap items-center">
        <Typography variant="h3" className="mb-5">
          Mes rapports d&#39;inspection
        </Typography>

        <Button
          size={"lg"}
          disabled={status === "executing"}
          onClick={handleCreateInspection}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Créer un rapport d&#39;inspection
        </Button>
      </div>
      <div className="w-full">
        <InspectionTable inspections={inspections} />
      </div>
    </AppContainer>
  );
};

export default ConsultantDashboard;
