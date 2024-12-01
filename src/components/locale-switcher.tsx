"use client";
import { useChangeLocale, useCurrentLocale } from "@/locale/client";

export const LocaleSwitcher = () => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <div
      className={`flex items-center  text-base rounded-full border-primary w-fit py-[3px] px-3 gap-3`}
    >
      <button
        onClick={() => changeLocale("fr")}
        className={`rounded-full flex flex-col items-center gap-[2px] ${
          locale === "fr" ? "text-primary font-bold" : "opacity-50"
        }`}
      >
        <span className="">FR</span>
      </button>

      <button
        onClick={() => changeLocale("en")}
        className={`rounded-full flex flex-col items-center gap-[2px] ${
          locale === "en" ? "text-primary font-bold" : "opacity-50"
        }`}
      >
        <span>EN</span>
      </button>
    </div>
  );
};
