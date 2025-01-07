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
import {
  insertConditionSchema,
  InsertQuestion,
  type InsertCondition,
} from "@/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ConditionForm = ({
  condition,
  handleUpdateCondition,
  question,
}: {
  condition: InsertCondition;
  handleUpdateCondition: (condition: InsertCondition) => void;
  question: InsertQuestion;
}) => {
  const form = useForm<z.infer<typeof insertConditionSchema>>({
    resolver: zodResolver(insertConditionSchema.extend({ id: z.string() })),
    defaultValues: {
      id: condition.id,
      createdAt: condition.createdAt,
      updatedAt: condition.updatedAt,
      deletedAt: condition.deletedAt,
      value: condition.value || "",
      questionId: condition.questionId,
    },
  });

  const onSubmitForm = async (
    values: z.infer<typeof insertConditionSchema>,
  ) => {
    handleUpdateCondition(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-3">
        {question.type === "SELECT" && !!question.options.length && (
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Valeur</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(question.type !== "SELECT" || !question.options.length) && (
          <>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2">Valeur</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value} />
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
