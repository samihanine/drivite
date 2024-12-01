import { Image } from "@/components/image";
import { type Car } from "../schemas/car";
import { Container } from "@/components/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/carousel";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { Typography } from "@/components/typography";
import {
  Table,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableCaption,
  TableBody,
  TableRow,
} from "@/components/table";
import { Badge } from "@/components/badge";

export function Car({ car }: { car: Car }) {
  return (
    <>
      <Container className="py-24">
        <Typography variant="h2" className="mb-10">
          {car.brand} {car.model}
        </Typography>

        <div className="flex justify-center gap-20">
          <Carousel>
            <CarouselContent>
              {car.images.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    alt={car.brand + " " + car.model}
                    width={1200}
                    height={600}
                    className="w-full h-96 object-contain bg-gray-100"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Card className="w-full sm:w-[400px]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {car.price} €
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <Button>Contacter le vendeur</Button>
            </CardFooter>
          </Card>
        </div>

        <Typography variant="h3" className="mt-10">
          Caractéristiques
        </Typography>

        <Card className="mt-5 max-w-xl w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caractéristique</TableHead>
                <TableHead>Valeur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Localisation</TableCell>
                <TableCell>{car.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Année</TableCell>
                <TableCell>{car.manufacturingYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kilométrage</TableCell>
                <TableCell>{car.mileage} km</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carburant</TableCell>
                <TableCell>{car.fuelType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transmission</TableCell>
                <TableCell>{car.transmission}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Crit'Air</TableCell>
                <TableCell>{car.critAir}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Puissance</TableCell>
                <TableCell>{car.enginePower}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Portes</TableCell>
                <TableCell>{car.doors}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sièges</TableCell>
                <TableCell>{car.seats}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Couleur intérieure</TableCell>
                <TableCell>{car.interiorColor}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Couleur extérieure</TableCell>
                <TableCell>{car.exteriorColor}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Equipements</TableCell>
                <TableCell>
                  {car.equipments?.map((equipment) => (
                    <Badge key={equipment}>{equipment}</Badge>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Container>
    </>
  );
}
