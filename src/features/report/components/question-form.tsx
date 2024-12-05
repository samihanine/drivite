"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
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
import { insertQuestionSchema, type InsertQuestion } from "@/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const QuestionForm = ({
  question,
  handleUpdateQuestion,
}: {
  question: InsertQuestion;
  handleUpdateQuestion: (question: InsertQuestion) => void;
}) => {
  const form = useForm<z.infer<typeof insertQuestionSchema>>({
    resolver: zodResolver(insertQuestionSchema.extend({ id: z.string() })),
    defaultValues: {
      type: question.type || "TEXT",
      label: question.label || "",
      required: question.required === undefined ? true : question.required,
      points: question.points || 0,
      id: question.id,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      deletedAt: question.deletedAt,
      order: question.order || 0,
      options: question.options || [],
      conditionId: question.conditionId,
      valueForPoints: question.valueForPoints,
      sectionId: question.sectionId,
    },
  });

  const prefabOptions = [
    "Oui,Non",
    "Bon état,Défaut(s) présent(s)",
    "Bon état,Mauvais état",
    "Fonctionnel,Non fonctionnel",
  ];

  const onSubmitForm = async (values: z.infer<typeof insertQuestionSchema>) => {
    handleUpdateQuestion(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
        <FormField
          control={form.control}
          name="label"
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

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">Obligatoire</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onClick={() => form.setValue("required", !field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem defaultValue={field.value}>
              <FormLabel className="flex gap-2">Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setValue("type", value as InsertQuestion["type"])
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEXT">
                      <span>Text</span>
                    </SelectItem>
                    <SelectItem value="SELECT">
                      <span>Choix multiple</span>
                    </SelectItem>
                    <SelectItem value="IMAGE">
                      <span>Image</span>
                    </SelectItem>
                    <SelectItem value="DATE">
                      <span>Date</span>
                    </SelectItem>
                    <SelectItem value="DATETIME">
                      <span>Date et heure</span>
                    </SelectItem>
                    <SelectItem value="NUMBER">
                      <span>Nombre</span>
                    </SelectItem>
                    <SelectItem value="PERCENTAGE">
                      <span>Pourcentage</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "SELECT" && (
          <>
            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem defaultValue={field.value}>
                  <FormLabel className="flex gap-2">
                    Options (séparées par des virgules)
                  </FormLabel>

                  <Card className="flex flex-wrap py-5 gap-2 p-3">
                    {prefabOptions.map((option) => (
                      <Button
                        key={option}
                        variant={"outline"}
                        type="button"
                        className="text-xs shadow-none border border-primary text-primary"
                        size={"sm"}
                        onClick={() =>
                          form.setValue("options", option.split(","))
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </Card>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={field.value.join(",")}
                      onChange={(e) =>
                        form.setValue("options", e.target.value.split(","))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
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
