import { Image } from "./image";
import { Typography } from "./typography";

export const UnderConstruction = () => {
  return (
    <div className="h-full min-h-[calc(100vh-80px)] flex flex-col gap-5 items-center justify-center">
      <Image
        src="/images/landing/under-construction.svg"
        alt="Under construction"
        className="w-full max-w-72"
      />
      <Typography variant="h1">Cette page est en construction</Typography>
      <Typography variant="paragraph">
        Nous travaillons dur pour vous proposer une expérience optimale. Revenez
        bientôt !
      </Typography>
    </div>
  );
};
