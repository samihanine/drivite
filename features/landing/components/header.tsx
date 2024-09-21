"use client";

import { Container } from "@/components/container";
import { Image } from "@/components/image";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { LocaleSwitcher } from "../../../components/locale-switcher";
import { MenuIcon } from "../../../components/menu-icon";
import { PhoneButton } from "./phone-button";
import { PageLink } from "../queries/get-page-links";

export function Header({ pageLinks }: { pageLinks: PageLink[] }) {
  const pathname = usePathname();

  function MobileNav() {
    return (
      <Popover>
        <Popover.Button
          className="group relative z-50 flex cursor-pointer items-center justify-center rounded-full bg-slate-100/80 p-3 shadow-sm shadow-sky-100/50 ring-1 ring-slate-900/5 transition duration-300 ease-in-out hover:bg-slate-200/60 focus:outline-none md:hidden"
          aria-label="Toggle Navigation"
        >
          {({ open }) => <MenuIcon open={open} />}
        </Popover.Button>
        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 z-20 bg-slate-900 bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100 "
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-90"
          >
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full z-30 mt-4 origin-top overflow-hidden rounded-2xl bg-slate-50 px-6 py-7 shadow-xl shadow-sky-100/40 ring-1 ring-slate-900/5"
            >
              <div>
                <div className="flex flex-col space-y-4">
                  {pageLinks.map((link) =>
                    link.children ? (
                      <div className="flex flex-col gap-3" key={link.label}>
                        <span className="font-semibold text-slate-700">
                          {link.label}
                        </span>
                        {link.children.map((child) => (
                          <Link
                            key={`${child.label}-mobile`}
                            href={child.href}
                            className="block ml-4 text-base font-semibold text-slate-700 duration-200 hover:text-slate-900"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={`${link.label}-mobile`}
                        href={link.href || "#"}
                        className="block text-base font-semibold text-slate-700 duration-200 hover:text-slate-900"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>

                <PhoneButton className="mt-8" />
              </div>
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      </Popover>
    );
  }

  return (
    <header className="h-20 border-b border-border bg-white">
      <Container className="flex h-full w-full items-center">
        <nav className="relative z-50 flex w-full items-center justify-between">
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              aria-label="Home"
              className="flex flex-shrink-0 items-center"
            >
              <Image
                src={"/images/logos/logo-text.svg"}
                alt=""
                className="h-8 w-auto sm:h-9 md:hidden lg:block lg:h-10"
              />
              <Image
                src={"/images/logos/logo-text.svg"}
                alt=""
                className="hidden h-8 w-auto md:block lg:hidden"
              />
            </Link>
          </div>
          <div className="hidden items-center md:flex md:space-x-6 lg:space-x-8">
            {pageLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="group relative">
                  <button className="relative z-10 font-medium text-slate-700 duration-200 hover:text-slate-900">
                    {link.label}{" "}
                    <ChevronDown className="h-4 w-4 inline-block" />
                  </button>
                  {/* Place le sous-menu plus proche du bouton */}
                  <div className="absolute left-0 hidden w-max rounded-md bg-white shadow-xl border border-border group-hover:block">
                    <div className="flex flex-col gap-5 p-5">
                      {link.children.map((child) => (
                        <Link
                          key={`${child.label}-desktop`}
                          href={child.href}
                          className={clsx(
                            'relative w-fit duration-200 after:absolute after:left-1/2 after:-bottom-2.5 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-slate-900 after:opacity-0 after:content-[""]',
                            pathname == link.href
                              ? "font-semibold text-slate-900 after:opacity-100"
                              : "font-medium text-slate-700 hover:text-slate-900 hover:after:opacity-25",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={`${link.label}-desktop`}
                  href={link.href || "#"}
                  className={clsx(
                    'relative duration-200 after:absolute after:left-1/2 after:-bottom-2.5 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-slate-900 after:opacity-0 after:content-[""]',
                    pathname == link.href
                      ? "font-semibold text-slate-900 after:opacity-100"
                      : "font-medium text-slate-700 hover:text-slate-900 hover:after:opacity-25",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
          <div className="flex items-center">
            {/* <LocaleSwitcher />*/}

            <PhoneButton className="hidden md:block" />

            <div className="ml-4 md:hidden">
              <MobileNav />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
