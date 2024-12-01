"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { showError } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { sendContactMessage } from "../actions/send-contact-message";
import { Textarea } from "@/components/textarea";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";

export const ContactForm = () => {
  const { executeAsync, status } = useAction(sendContactMessage);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;
    const motivation = formData.get("motivation") as string;

    const result = await executeAsync({
      email,
      name,
      message,
      phone,
      motivation,
    });

    if (result?.data?.error) {
      showError({ message: result?.data?.error.message });
    }
  };

  const loading = status === "executing";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="ex: sarah@gmail.com"
          type="email"
          name="email"
          id="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input
          placeholder="ex: Sarah Hanine"
          type="text"
          name="name"
          id="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          placeholder="ex: 06 33 82 71 73"
          type="text"
          name="phone"
          id="phone"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          placeholder="ex: Bonjour, je suis intéressé par votre offre..."
          name="message"
          id="message"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buy">Motivation</Label>
        <RadioGroup name="motivation" defaultValue="buy">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="buy" id="buy" />
            <Label className="text-muted-foreground font-normal" htmlFor="buy">
              Acheter une voiture
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sell" id="sell" />
            <Label className="text-muted-foreground font-normal" htmlFor="sell">
              Vendre une voiture
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partner" id="partner" />
            <Label
              className="text-muted-foreground font-normal"
              htmlFor="partner"
            >
              Devenir partenaire
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2 !mt-10 !mb-8">
        <Button type="submit" className="!w-full" disabled={loading}>
          {loading ? "Chargement..." : "Envoyer"}
        </Button>
      </div>
    </form>
  );
};
