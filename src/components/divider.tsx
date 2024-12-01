import { cn } from "@/lib/utils";

export const Divider = ({ className }: { className?: string }) => {
  return <hr className={cn("border-t border-gray-200 w-full", className)} />;
};
