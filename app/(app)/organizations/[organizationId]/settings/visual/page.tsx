import AddCardVisualButton from "@/components/card-visual/add-card-visual-button";
import CardVisualTable from "@/components/card-visual/card-visual-table";
import { CardTitle } from "@/components/ui/card";
import { CardVisual } from "@/lib/schemas";
import { getCardVisualsByOrganizationId } from "@/server/card-visual";
import { getOrganization } from "@/server/organization";
import { getCurrentUser } from "@/server/user";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const organization = await getOrganization({ id: organizationId });

  if (!organization?.data) {
    return notFound();
  }

  const cardVisualsData = await getCardVisualsByOrganizationId({
    organizationId: organizationId,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-5">
        <CardTitle className="text-lg text-center">
          Vos visuels de cartes
        </CardTitle>

        <AddCardVisualButton organizationId={organizationId} />
      </div>

      <CardVisualTable
        cardVisuals={(cardVisualsData?.data || []) as CardVisual[]}
      />
    </div>
  );
}
