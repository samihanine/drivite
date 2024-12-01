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
import { showError } from "@/lib/utils";
import { updateUser } from "@/features/user/actions/update-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback } from "@/components/avatar";
import UploadImageInput from "@/features/upload/components/upload-image-input";
import { getFileUrlByKey } from "@/lib/s3";
import { User, userSchema } from "@/db/schemas";

const formSchema = userSchema.partial();

export function UserForm({
  user,
  onSuccess,
}: {
  user: User;
  onSuccess?: (user: User) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      imagePath: user?.imagePath ?? undefined,
      email: user?.email ?? "",
    },
  });

  const { executeAsync: updateAsync, status: updateStatus } =
    useAction(updateUser);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateAsync({ ...user, ...values, id: user.id });

    if (result?.data?.id) {
      onSuccess?.(result.data as User);
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
      });
    }
  };

  const imagePath = form.getValues("imagePath");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <FormLabel>Image</FormLabel>

          <Avatar className="w-20 h-20 text-xl">
            {!!imagePath?.length && typeof imagePath === "string" ? (
              <img
                src={getFileUrlByKey(imagePath)}
                alt="Avatar"
                width={44}
                height={44}
                className="!w-full object-cover"
              />
            ) : (
              <AvatarFallback>
                {form.getValues("name")?.[0] || ""}
              </AvatarFallback>
            )}
          </Avatar>

          <UploadImageInput
            setImagePath={(url) => {
              form.setValue("imagePath", url);
              form.trigger("imagePath");
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom et nom</FormLabel>
              <FormControl>
                <Input placeholder="ex: John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="ex: john@apple.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={updateStatus === "executing"}
        >
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
