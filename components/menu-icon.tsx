"use client";

import clsx from "clsx";

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative h-3.5 w-4 transform transition duration-500 ease-in-out">
      <span
        className={clsx(
          "absolute block h-0.5 rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900",
          open ? "top-1.5 left-1/2 w-0" : "top-0 left-0 w-full",
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900",
          open ? "rotate-45" : "rotate-0",
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900",
          open ? "-rotate-45" : "rotate-0",
        )}
      />
      <span
        className={clsx(
          "absolute block h-0.5 rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900",
          open ? "top-1.5 left-1/2 w-0" : "left-0 top-3 w-full",
        )}
      />
    </span>
  );
}
