"use client";

import { Button } from "@/components/button";
import { DialogTitle } from "@/components/dialog";
import { Divider } from "@/components/divider";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/drawer";
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
import { Textarea } from "@/components/textarea";
import { questionSchema, type Question } from "@/db/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const UpdateQuestionButton = ({
  question,
  handleUpdateQuestion,
  children,
}: {
  question: Question;
  handleUpdateQuestion: (question: Question) => void;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema.extend({ id: z.string() })),
    defaultValues: {
      pointConditionType: question.pointConditionType || "NONE",
      displayConditionType: question.displayConditionType || "ALWAYS",
      type: question.type || "TEXT",
      label: question.label || "",
      required: question.required === undefined ? true : question.required,
      points: question.points || 0,
      id: question.id,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      deletedAt: question.deletedAt,
      order: question.order || 0,
      description: question.description || "",
    },
  });

  const onSubmitForm = async (values: z.infer<typeof questionSchema>) => {
    handleUpdateQuestion(values);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-5">
          <DialogTitle className="text-center mb-5">
            Modifier la {question.type === "SECTION" ? "section" : "question"}
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="space-y-3"
            >
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

              {question.type === "SECTION" && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2">Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {question.type !== "SECTION" && (
                <>
                  <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-2">
                          Obligatoire
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onClick={() =>
                              form.setValue("required", !field.value)
                            }
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
                              form.setValue("type", value as Question["type"])
                            }
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BOOLEAN">
                                <span>Oui / Non</span>
                              </SelectItem>
                              <SelectItem value="TEXT">
                                <span>Champs de text libre</span>
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
                              <SelectItem value="STATE">
                                <span>Bon état / Défaut(s) présent(s)</span>
                              </SelectItem>
                              <SelectItem value="CONFORM">
                                <span>Conforme / Non conforme</span>
                              </SelectItem>
                              <SelectItem value="FUNCTIONAL">
                                <span>Fonctionnel / Non fonctionnel</span>
                              </SelectItem>
                              <SelectItem value="NOT_EQUIPPED">
                                <span>
                                  Fonctionnel / Non fonctionnel / Non équipé
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="displayConditionType"
                    render={({ field }) => (
                      <FormItem defaultValue={field.value}>
                        <FormLabel className="flex gap-2">
                          Affichage conditionnel
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) =>
                              form.setValue(
                                "displayConditionType",
                                value as Question["displayConditionType"],
                              )
                            }
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ALWAYS">
                                Toujours afficher
                              </SelectItem>
                              <SelectItem value="IF_TRUE">
                                Seulement si la réponse précédente est valide
                              </SelectItem>
                              <SelectItem value="IF_FALSE">
                                Seulement si la réponse précédente est invalide
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(form.watch("type") === "BOOLEAN" ||
                    form.watch("type") === "STATE" ||
                    form.watch("type") === "CONFORM" ||
                    form.watch("type") === "FUNCTIONAL" ||
                    form.watch("type") === "NOT_EQUIPPED") && (
                    <FormField
                      control={form.control}
                      name="pointConditionType"
                      render={({ field }) => (
                        <FormItem defaultValue={field.value}>
                          <FormLabel className="flex gap-2">
                            Calcul des points
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(value) =>
                                form.setValue(
                                  "pointConditionType",
                                  value as Question["pointConditionType"],
                                )
                              }
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NONE">
                                  Pas de points
                                </SelectItem>
                                <SelectItem value="IF_TRUE">
                                  Seulement si la réponse à cette question est
                                  valide
                                </SelectItem>
                                <SelectItem value="IF_FALSE">
                                  Seulement si la réponse à cette question est
                                  invalide
                                </SelectItem>
                                <SelectItem value="PERCENTAGE">
                                  En dessous de 50 = +1 point et en dessous de
                                  25 = +2 points
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(form.watch("pointConditionType") === "IF_TRUE" ||
                    form.watch("pointConditionType") === "IF_FALSE") && (
                    <FormField
                      control={form.control}
                      name="points"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="flex gap-2">Points</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ex: 10"
                              type="number"
                              {...field}
                              value={parseInt(String(field.value)) || 0}
                              onChange={(e) =>
                                form.setValue(
                                  "points",
                                  parseInt(e.target.value),
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
              <div className="h-4" />
              <div className="flex justify-end">
                <Button className="z-50 w-full" type="submit">
                  Mettre à jour
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
