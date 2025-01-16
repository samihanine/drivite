import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";

type Formula = {
  Icon: React.ElementType<{ className: string }>;
  title: string;
  tierOne: boolean;
  tierTwo: boolean;
  tierThree: boolean;
};

const PricingFormulas = ({ formulas }: { formulas: Formula[] }) => {
  return (
    <section className="relative bg-[#F8F9FF] text-gray-900">
      <Container className="py-20">
        <Typography variant="h2" className="text-center">
          Détails de nos formules{" "}
        </Typography>
        <Typography
          variant="paragraph"
          className="text-center text-gray-500 mt-8 mx-auto max-w-2xl"
        >
          Parmi ces trois formules, vous êtes sûr de trouver celle qui répond à
          vos besoins. Que vous soyez novice ou expert, notre équipe est prête à
          vous accompagner à chaque étape de votre projet automobile.
        </Typography>

        <div className="w-full mt-16 bg-white rounded-lg border border-blue-500/50">
          <table>
            {formulas.map((formula, index) => (
              <tr
                key={index}
                className={cn(
                  "p-3",
                  index < formulas.length - 1 && "border-b border-blue-500/50",
                )}
              >
                <td className="p-6 border-r border-blue-500/50">
                  {formula.title}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Container>
    </section>
  );
};

export default PricingFormulas;
