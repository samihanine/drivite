import { cn } from "@/lib/utils";

type TypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "paragraph"
  | "lead"
  | "small";

export const Typography = ({
  variant,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  variant: TypographyVariants;
}) => {
  switch (variant) {
    case "h1":
      return (
        <h1
          {...props}
          className={cn("text-5xl font-bold leading-[3.5rem]", props.className)}
        />
      );
    case "h2":
      return (
        <h2
          {...props}
          className={cn(
            "text-4xl font-semibold leading-[3.25rem]",
            props.className,
          )}
        />
      );
    case "h3":
      return (
        <h3
          {...props}
          className={cn("text-2xl font-medium leading-[3rem]", props.className)}
        />
      );
    case "h4":
      return (
        <h4 {...props} className={cn("text-xl font-medium", props.className)} />
      );
    case "h5":
      return (
        <h5 {...props} className={cn("text-lg font-medium", props.className)} />
      );
    case "h6":
      return (
        <h6
          {...props}
          className={cn("text-base font-medium", props.className)}
        />
      );
    case "paragraph":
      return <p {...props} className={cn("text-base", props.className)} />;
    case "lead":
      return (
        <p {...props} className={cn("text-lg font-medium", props.className)} />
      );
    default:
      return (
        <p
          {...props}
          className={cn("text-sm text-muted-foreground", props.className)}
        />
      );
  }
};
