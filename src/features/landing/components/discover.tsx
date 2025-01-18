import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Typography } from "@/components/typography";
import Image from "next/image";
import Link from "next/link";

export default function Discover({
  title,
  subtitle,
  buttonText,
  imagePath,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  imagePath: string;
}) {
  return (
    <Container className="flex flex-col items-center justify-center gap-8 flex-1 sm:flex-row">
      <div className="flex flex-col gap-8 flex-1">
        <Typography variant="h2" className="">
          {title}
        </Typography>
        <Typography variant="paragraph" className="">
          {subtitle}
        </Typography>
        <Link href="/login">
          <Button className="bg-[#2FD9FF] text-black w-fit">
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className="flex-1">
        <Image
          src={imagePath}
          alt="Discover"
          width={500}
          height={500}
          className="w-auto h-auto max-w-full max-h-[700px] py-10 mx-auto"
        />
      </div>
    </Container>
  );
}
