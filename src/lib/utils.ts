import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateDistance(coord1: number[], coord2: number[]): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(coord2[0] - coord1[0]);
  const dLon = degreesToRadians(coord2[1] - coord1[1]);

  const lat1 = degreesToRadians(coord1[0]);
  const lat2 = degreesToRadians(coord2[0]);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

export function formatDateForDisplay(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const showError = (error: { message: string; code?: string }) => {
  toast.error(error.message, {
    dismissible: true,
    position: "top-center",
    style: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
  });
};

export const showSuccess = ({ message }: { message: string }) => {
  toast.success(message, {
    dismissible: true,
    position: "top-center",
    style: {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
  });
};

export const showLoading = () => {
  return toast.loading("Chargement...", {
    position: "top-center",
  });
};

export const htmlToTailwind = (text: string): string => {
  return text
    .replaceAll("<p>", '<p class="text-base mb-4">')
    .replaceAll("<h2>", '<h2 class="text-2xl font-bold mt-10">')
    .replaceAll("<h3>", '<h3 class="text-xl font-bold mt-8">')
    .replaceAll("<h4>", '<h4 class="text-lg font-bold mt-6">')
    .replaceAll("<h5>", '<h5 class="text-base font-bold mt-4">')
    .replaceAll("<h6>", '<h6 class="text-sm font-bold mt-2">')
    .replaceAll("<ul>", '<ul class="list-disc list-inside">')
    .replaceAll("<ol>", '<ol class="list-decimal list-inside">')
    .replaceAll("<li>", '<li class="text-base">')
    .replaceAll("<a ", '<a class="text-blue-500 underline" ')
    .replaceAll("<blockquote>", '<blockquote class="border-l-4 pl-4">')
    .replaceAll("<code>", '<code class="bg-gray-100 p-1 rounded">')
    .replaceAll("<pre>", '<pre class="bg-gray-100 p-4 rounded">')
    .replaceAll("<table>", '<table class="table-auto w-full">')
    .replaceAll("<th>", '<th class="border-b">')
    .replaceAll("<td>", '<td class="border-b">')
    .replaceAll("<img ", '<img class="w-full h-auto rounded-lg" ');
};
