"use server";

import { sendEmail } from "@/lib/resend";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const sendContactMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

export type SendContactMessage = z.infer<typeof sendContactMessageSchema>;
export const sendContactMessage = actionClient
  .schema(sendContactMessageSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, phone, message } = parsedInput;

    try {
      const text = `Nom: ${name}<br><br>Email: ${email}<br><br>Téléphone: ${
        phone || "Non renseigné"
      }<br><br>Message: ${message}`;

      console.log("Sending email:", text);

      const result = await sendEmail({
        to: "contact@drivite.fr",
        subject: "Nouveau message de contact",
        title: `${name} vous a envoyé un message`,
        text,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          message:
            "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
        },
      };
    }
  });
