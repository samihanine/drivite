import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  CheckBadgeIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type Formula = {
  Icon: any;
  title: string;
  tierOne: boolean;
  tierTwo: boolean;
  tierThree: boolean;
};

const CheckCell = ({ isCheked }: { isCheked: boolean }) => {
  return (
    <div
      className={cn(
        "rounded-full w-5 h-5 flex justify-center items-center",
        isCheked ? "bg-green-500" : "bg-red-500",
      )}
    >
      {isCheked ? (
        <CheckIcon className="w-3 h-3 text-white" />
      ) : (
        <XMarkIcon className="w-3 h-3 text-white" />
      )}
    </div>
  );
};

const PricingFormulas = ({
  formulas,
  tierOne,
  tierTwo,
  tierThree,
}: {
  formulas: Formula[];
  tierOne: string;
  tierTwo: string;
  tierThree: string;
}) => {
  return (
    <section className="relative bg-[#F8F9FF] text-gray-900">
      <Container className="py-20">
        <Typography variant="h2" className="text-center">
          Détails de nos formules{" "}
        </Typography>
        <Typography
          variant="paragraph"
          className="text-center text-gray-500 mt-8 mx-auto max-w-4xl"
        >
          Parmi ces trois formules, vous êtes sûr de trouver celle qui répond à
          vos besoins. Que vous soyez novice ou expert, notre équipe est prête à
          vous accompagner à chaque étape de votre projet automobile.
        </Typography>

        <div className="mt-16">
          <div className="flex mb-5">
            <div className="flex-1"></div>
            <p className="w-28 text-center text-muted-foreground">{tierOne}</p>
            <p className="w-28 text-center text-muted-foreground">{tierTwo}</p>
            <p className="w-28 text-center font-medium text-primary">
              {tierThree}
            </p>
          </div>

          <div className="w-full bg-white rounded-lg border border-blue-500/50">
            <table className="w-full">
              {formulas.map((formula, index) => (
                <tr
                  key={index}
                  className={cn(
                    "flex w-full flex-col sm:flex-row",
                    index < formulas.length - 1 &&
                      "border-b border-blue-500/50",
                  )}
                >
                  <td className="px-6 py-4 flex items-center">
                    <div className="border border-[#5377ac] rounded-sm p-2 bg-[#E7F1FB] hidden sm:flex">
                      <formula.Icon className="w-5 h-5 text-[#5377ac]" />
                    </div>
                  </td>
                  <td className="py-3 px-10 flex-1 flex items-center font-medium text-center sm:text-left">
                    {formula.title}
                  </td>
                  <div className="flex justify-end">
                    <td className="py-3 w-28 flex items-center justify-center">
                      <CheckCell isCheked={formula.tierOne} />
                    </td>
                    <td className="py-3 w-28 flex items-center justify-center">
                      <CheckCell isCheked={formula.tierTwo} />
                    </td>
                    <td className="py-3 w-28 flex items-center justify-center">
                      <CheckCell isCheked={formula.tierThree} />
                    </td>
                  </div>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PricingFormulas;
