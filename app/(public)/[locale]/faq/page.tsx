import { Cta } from "@/features/landing/components/cta";
import { Faq } from "@/features/landing/components/faq";
import { Hero } from "@/features/landing/components/hero";
import { getQuestions } from "@/features/landing/queries/get-questions";

export default async function Page() {
  const questions = await getQuestions();

  return (
    <>
      <Hero
        title="Une question, une réponse !"
        description="Sur cette page, vous trouverez des réponses complètes à toutes les questions courantes que vous pourriez avoir concernant Drivite, ainsi que des informations détaillées sur le processus d'achat et de vente de véhicules liés à nos services"
        backgroundImagePath="/images/landing/question.jpg"
      />
      <Faq questions={questions} />
      <Cta />
    </>
  );
}
