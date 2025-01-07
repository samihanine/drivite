"use client";

import { Button } from "@/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Switch } from "@/components/switch";
import { insertSectionSchema, type InsertSection } from "@/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SectionForm = ({
  section,
  handleUpdateSection,
}: {
  section: InsertSection;
  handleUpdateSection: (section: InsertSection) => void;
}) => {
  const form = useForm<z.infer<typeof insertSectionSchema>>({
    resolver: zodResolver(insertSectionSchema.extend({ id: z.string() })),
    defaultValues: {
      title: section.title || "",
      id: section.id,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
      deletedAt: section.deletedAt,
      order: section.order || 0,
      isToggled: section.isToggled === undefined ? true : section.isToggled,
    },
  });

  const onSubmitForm = async (values: z.infer<typeof insertSectionSchema>) => {
    handleUpdateSection(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">Titre</FormLabel>
              <FormControl>
                <Input type="text" {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="h-4" />

        <div className="flex justify-center">
          <Button className="z-50 w-full" type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};
