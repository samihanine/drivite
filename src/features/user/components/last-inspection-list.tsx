import { Card } from "@/components/card";
import { Typography } from "@/components/typography";
import { Consultant, Inspection } from "@/db/schemas";

const LastInspectionList = ({
  inspections,
  consultants,
}: {
  inspections: Inspection[];
  consultants: Consultant[];
}) => {
  return (
    <Card className="w-full p-4">
      <Typography variant="lead" className="mb-4">
        Dernières inspections
      </Typography>

      <div className="flex flex-col gap-4">
        {!inspections.length && (
          <Typography variant="small" className="text-muted-foreground">
            Aucun inspection n&apos;a été réalisée récemment
          </Typography>
        )}

        {inspections.map((inspection) => {
          const consultant = consultants.find(
            (consultant) => consultant.id === inspection.consultantId,
          );

          if (!consultant) {
            return null;
          }

          return (
            <div key={inspection.id} className="flex flex-col gap-2">
              <Typography variant="h5">
                {consultant.firstName} {consultant.lastName}
              </Typography>
              <Typography variant="small" className="text-muted-foreground">
                {inspection.createdAt.toLocaleDateString()}
              </Typography>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LastInspectionList;
