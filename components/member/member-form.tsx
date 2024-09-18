"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Member, memberSchema } from "@/lib/schemas";
import { showError } from "@/lib/utils";
import { createMember, updateMember } from "@/server/member";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AccordionTitle from "../ui/accordion-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import UploadImageInput from "../upload/upload-image-input";
import MemberAvatar from "./member-avatar";

const formSchema = memberSchema.omit({
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
});

export function MemberForm({
  member,
  onSuccess,
}: {
  member?: Member;
  onSuccess?: (member: Member) => void;
}) {
  const { executeAsync: updateAsync, status: updateStatus } =
    useAction(updateMember);
  const { executeAsync: createAsync, status: createStatus } =
    useAction(createMember);

  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(member ? formSchema : formSchema.omit({ id: true })),
    defaultValues: {
      id: member?.id,
      firstName: member?.firstName ?? "",
      lastName: member?.lastName ?? "",
      email: member?.email ?? "",
      phoneNumber: member?.phoneNumber ?? "",
      imagePath: member?.imagePath ?? "",
      organizationId:
        (params.organizationId as string) ?? member?.organizationId ?? "",
      membershipExpiresAt:
        member?.membershipExpiresAt ??
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      address: member?.address ?? "",
      address2: member?.address2 ?? "",
      city: member?.city ?? "",
      region: member?.region ?? "",
      postalCode: member?.postalCode ?? "",
      countryCode: member?.countryCode ?? "",
      position: member?.position ?? "",
      birthDate: member?.birthDate,
      nationality: member?.nationality ?? "",
    },
  });

  useEffect(() => {
    form.register("imagePath");
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = member
      ? await updateAsync(values as Member & { id: string })
      : await createAsync(values);

    if (result?.data?.id) {
      onSuccess?.(result.data as Member);
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de la création de l'organisation.",
      });
    }
  };

  const imagePath = form.getValues("imagePath") as string;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <AccordionTitle title="Informations générales" defaultOpen={true}>
          <div className="flex justify-between items-center gap-4">
            <MemberAvatar
              size="lg"
              path={imagePath}
              alt={`${form.getValues("firstName")} ${form.getValues(
                "lastName",
              )}`}
            />

            <FormField
              control={form.control}
              name="imagePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImageInput
                      setImagePath={(url) => {
                        form.setValue("imagePath", url);
                        form.trigger("imagePath");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Prénom
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input required placeholder="ex: Dorian" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Ham" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="membershipExpiresAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Fin d&apos;adhésion
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="col-span-3 !mt-0"
                    {...field}
                    value={
                      field.value
                        ? moment(new Date(field.value)).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={(e) => {
                      field.onChange(new Date(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionTitle>

        <AccordionTitle title="Informations secondaires">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Poste</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Directeur"
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
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Date de naissance</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="col-span-3 !mt-0"
                    {...field}
                    value={
                      field.value
                        ? moment(new Date(field.value)).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={(e) => {
                      field.onChange(new Date(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Nationalité</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Française"
                    className="col-span-3 !mt-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionTitle>

        <AccordionTitle title="Contact">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: dorian@example.com"
                    type="email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Téléphone </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="col-span-3 !mt-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionTitle>

        <AccordionTitle title="Adresse">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Adresse </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: 1 rue de Paris"
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
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Adresse 2</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="ex: appartement 12"
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
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Code postal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: 75001"
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Ville</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Paris"
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
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Région</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Ile de France"
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
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">Pays</FormLabel>
                <div className="col-span-3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "FR"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FR">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </AccordionTitle>

        <Button
          className="z-50 w-full mt-4"
          type="submit"
          disabled={
            updateStatus === "executing" || createStatus === "executing"
          }
        >
          {member ? "Mettre à jour" : "Ajouter un membre"}
        </Button>
      </form>
    </Form>
  );
}
