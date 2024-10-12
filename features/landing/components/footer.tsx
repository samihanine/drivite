import Link from "next/link";
import { Container } from "@/components/container";
import { EmailIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { getI18n } from "@/locale/server";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { PhoneButton } from "./phone-button";
import { PageLink } from "../queries/get-page-links";

const socialLinks = [
  {
    label: "Email",
    icon: EmailIcon,
    href: "mailto:contact@drivite.fr",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/drivite_fr/",
  },
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/drivite/",
  },
];

function SocialLink({
  icon: Icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
  href: string;
}) {
  return (
    <a
      className="flex items-center justify-center gap-2.5 rounded-full border border-primary py-2.5 text-sm text-muted-foreground duration-200 ease-in-out hover:bg-primary hover:text-white lg:gap-2 xl:gap-2.5"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </a>
  );
}

export async function Footer({ pageLinks }: { pageLinks: PageLink[] }) {
  const t = await getI18n();
  return (
    <section>
      <footer className="overflow-hidden border-t border-t-border bg-background py-8 sm:py-16">
        <Container>
          <div className="mx-auto grid max-w-xl items-center gap-5 lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <div className="lg:col-span-7 flex flex-col items-center sm:items-start">
              <h3 className="text-center font-display text-4xl font-semibold text-foreground sm:text-5xl lg:max-w-xl lg:text-left">
                {t("footer.title")}
              </h3>
              <PhoneButton className="mt-8" />
            </div>
            <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
              <p className="text-center text-base text-muted-foreground lg:text-left">
                {t("common.description")}
              </p>
              <div className="mt-16 grid w-full max-w-sm grid-cols-2 gap-3.5 sm:max-w-none sm:grid-cols-3 lg:mt-8 lg:gap-2.5 xl:gap-3.5">
                {socialLinks.map((socialLink) => (
                  <SocialLink
                    key={`footer-social-link-${socialLink.label}`}
                    icon={socialLink.icon}
                    label={socialLink.label}
                    href={socialLink.href}
                  />
                ))}
              </div>
            </div>
          </div>
          <hr className="mb-6 mt-12 h-px w-full border-border sm:mb-10 sm:mt-16" />
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="bg-white rounded-full p-1">
                <LocaleSwitcher />
              </div>
              {pageLinks.map((link, index) => (
                <Link
                  key={`footer-link-${index}`}
                  href={link.href || "/"}
                  className="text-base font-medium text-muted-foreground duration-200 ease-in-out hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-base text-muted-foreground md:mt-0">
              © {new Date().getFullYear()} Drivite. {t("footer.rights")}
            </p>
          </div>
        </Container>
      </footer>
    </section>
  );
}
