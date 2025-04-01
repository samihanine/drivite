import { Card } from "@/components/card";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type CarCardProps = {
  imageUrl: string;
  title: string;
  price: number;
  location: string;
  subtitle: string;
  isSold: boolean;
};

export default function CarCard({
  imageUrl,
  title,
  subtitle,
  price,
  location,
  isSold,
}: CarCardProps) {
  return (
    <Card
      className={cn(
        "border border-[#79b0ff] rounded-lg shadow-lg shadow-blue-500/20 h-full",
        isSold && "border-green-500",
      )}
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={1000}
          height={1000}
          className="w-full aspect-video object-cover rounded-t-lg"
        />

        {isSold && (
          <div className="absolute top-0 right-0 bg-green-500 text-white rounded-tr-lg rounded-bl-lg p-2">
            <Typography
              className="text-white flex items-center gap-2"
              variant="small"
            >
              <div className="flex items-center justify-center rounded-full bg-white p-1">
                <CheckIcon className="w-3 h-3 text-green-500" />
              </div>
              Vendu
            </Typography>
          </div>
        )}
      </div>
      <div className="p-5 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="flex flex-col">
          <Typography className="text-primary" variant="lead">
            {title}
          </Typography>
          <Typography variant="small">{subtitle}</Typography>
          <Typography variant="small">{location}</Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            className={isSold ? "text-green-500" : "text-primary"}
            variant="h3"
          >
            {price}€
          </Typography>
        </div>
      </div>
    </Card>
  );
}
