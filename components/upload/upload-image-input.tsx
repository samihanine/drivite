import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { showError } from "../../lib/utils";
import { uploadFile } from "../../server/upload";
import { Input } from "../ui/input";

export default function UploadImageInput({
  setImagePath,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  setImagePath: (url: string) => void;
}) {
  const { executeAsync, status } = useAction(uploadFile);

  return (
    <Input
      type="file"
      accept="image/*"
      className={cn("w-full border border-border", className)}
      disabled={status === "executing"}
      onChange={async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 3_000_000) {
          showError({ message: "L'image ne doit pas dépasser 3Mo." });
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const result = await executeAsync(formData);

        if (result?.data) {
          setImagePath(result.data);
        } else {
          showError({
            message: "Une erreur s'est produite lors de l'envoi de l'image.",
          });
        }
      }}
      {...props}
    />
  );
}
