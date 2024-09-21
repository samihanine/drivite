import { ContactHero } from "@/features/landing/components/contact-hero";
import { Faq } from "@/features/landing/components/faq";
import { Map } from "@/features/landing/components/map";
import { getQuestions } from "@/features/landing/queries/get-questions";

export default async function Page() {
  const questions = await getQuestions();

  return (
    <>
      <ContactHero />
      <Map />
      <Faq questions={questions} />
    </>
  );
}
