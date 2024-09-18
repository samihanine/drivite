"use client";

import { Button } from "@/components/ui/button";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  DEFAULT_IMAGE_CARD_BACK_PATH,
  DEFAULT_IMAGE_CARD_FRONT_PATH,
} from "@/lib/config";
import { CardVisual, cardVisualSchema } from "@/lib/schemas";
import { showError } from "@/lib/utils";
import { createCardVisual, updateCardVisual } from "@/server/card-visual";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import UploadImageInput from "../upload/upload-image-input";
import { getFileUrlByKey } from "@/lib/s3";
import Image from "next/image";

const formSchema = cardVisualSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export default function CardVisualForm({
  organizationId,
  cardVisual,
  onSuccess,
}: {
  cardVisual?: CardVisual;
  organizationId: string;
  onSuccess?: (cardVisual: CardVisual) => void;
}) {
  const { executeAsync: updateAsync, status: updateStatus } =
    useAction(updateCardVisual);
  const { executeAsync: createAsync, status: createStatus } =
    useAction(createCardVisual);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...cardVisual,
      frontPath: cardVisual?.frontPath ?? DEFAULT_IMAGE_CARD_FRONT_PATH,
      backPath: cardVisual?.backPath ?? DEFAULT_IMAGE_CARD_BACK_PATH,
      organizationId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = cardVisual
      ? await updateAsync({ ...cardVisual, ...values, deletedAt: undefined })
      : await createAsync(values);

    if (result?.data?.error) {
      showError({
        message: result.data.error.message,
      });
    } else if (result?.data?.cardVisual?.id) {
      onSuccess?.(result.data.cardVisual as CardVisual);
    } else {
      showError({
        message: "Une erreur s'est produite lors de la mise à jour de l'image.",
      });
    }
  };

  const status = cardVisual ? updateStatus : createStatus;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full self-center"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>
                Title
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Apple Inc."
                  className="col-span-3 !mt-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frontPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image recto
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <UploadImageInput
                  setImagePath={(url) => {
                    form.setValue("frontPath", url);
                  }}
                />
              </FormControl>

              <Image
                src={getFileUrlByKey(form.getValues("frontPath"))}
                alt="Image recto"
                className="w-full h-auto object-cover mb-3"
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="backPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image verso
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <UploadImageInput
                  setImagePath={(url) => {
                    form.setValue("backPath", url);
                  }}
                />
              </FormControl>

              <Image
                src={getFileUrlByKey(form.getValues("backPath"))}
                alt="Image recto"
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                className="w-full h-auto object-cover mb-3"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="!w-full"
          disabled={status === "executing"}
        >
          {status !== "executing"
            ? cardVisual
              ? "Mettre à jour"
              : "Ajouter"
            : "Chargement..."}
        </Button>
      </form>
    </Form>
  );
}
