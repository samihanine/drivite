import { UnderConstruction } from "@/components/under-construction";
import Articles from "@/features/landing/components/articles";
import { Cta } from "@/features/landing/components/cta";

export default function Page() {
  return (
    <>
      <Articles
        urls={[
          "https://www.brefeco.com/actualite/innovation/drivite-simplifier-et-securiser-lachat-automobile",
          "https://www.lejournaldesentreprises.com/article/drivite-veut-simplifier-et-securiser-les-transactions-automobiles-2112515",
          "https://www.leprogres.fr/economie/2025/02/11/cette-start-up-lyonnaise-vous-copilote-dans-l-achat-et-la-vente-de-vehicules",
        ]}
      />
      <Cta />
    </>
  );
}
