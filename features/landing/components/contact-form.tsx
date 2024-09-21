"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { showError } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { sendContactMessage } from "../actions/send-contact-message";
import { Textarea } from "@/components/textarea";

export const ContactForm = () => {
  const { executeAsync, status } = useAction(sendContactMessage);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;

    const result = await executeAsync({ email, name, message, phone });

    if (result?.data?.error) {
      showError({ message: result?.data?.error.message });
    }
  };

  const loading = status === "executing";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input placeholder="Email" type="email" name="email" />

      <Input placeholder="Nom" type="text" name="name" />

      <Input placeholder="Téléphone" type="text" name="phone" />

      <Textarea placeholder="Message" name="message" />

      <div className="space-y-2 !mt-10 !mb-8">
        <Button type="submit" className="!w-full" disabled={loading}>
          {loading ? "Chargement..." : "Envoyer"}
        </Button>
      </div>
    </form>
  );
};
