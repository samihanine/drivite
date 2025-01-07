"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { RadioCard } from "@/components/radio-card";
import { Stepper } from "@/components/stepper";
import { InsertConsultant, User } from "@/db/schemas";
import { createConsultant } from "@/features/consultant/actions/create-consultant";
import { updateCurrentUser } from "@/features/user/actions/update-current-user";
import { updateUser } from "@/features/user/actions/update-user";
import { UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  {
    title: "Qui êtes-vous ?",
    description: "Décrivez comment vous souhaitez utiliser la plateforme.",
  },
  {
    title: "Complétez votre profil",
    description:
      "Ajoutez des informations pour personnaliser votre expérience.",
  },
];

export default function Onboarding({ userId }: { userId: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [userRole, safeUserRole] = useState<User["role"]>("CONSULTANT");
  const [consultant, setConsultant] = useState<InsertConsultant>({
    userId,
    firstName: "",
    lastName: "",
    email: "",
    zone: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    siren: "",
  });
  const router = useRouter();
  const { executeAsync: executeCreateConsultant } = useAction(createConsultant);
  const { executeAsync: executeUpdateUser } = useAction(updateCurrentUser);

  const handleNextStep = async () => {
    if (activeStep === steps.length - 1 && userRole === "CONSULTANT") {
      await executeCreateConsultant(consultant);
      await executeUpdateUser({ id: userId, role: userRole });

      router.push("/app");
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  return (
    <Stepper hideSidebar steps={steps} activeStep={activeStep}>
      <div className="pb-20 pt-10 flex justify-center">
        <form
          className="w-full max-w-3xl mx-auto flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleNextStep();
          }}
        >
          {activeStep === 0 && (
            <RadioCard
              value={userRole}
              onValueChange={(value) => safeUserRole(value as User["role"])}
              items={[
                {
                  label: "Je cherche à acheter ou vendre une voiture",
                  value: "CUSTOMER",
                  disabled: true,
                  Icon: ({ className }: { className: string }) => (
                    <UserIcon className={className} />
                  ),
                },
                {
                  label: "Je souhaite devenir partenaire Drivite",
                  value: "CONSULTANT",
                  Icon: ({ className }: { className: string }) => (
                    <WrenchScrewdriverIcon className={className} />
                  ),
                },
              ]}
            />
          )}

          {activeStep === 1 && userRole === "CONSULTANT" && (
            <>
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <Label htmlFor="firstName" className="flex-1">
                    Prénom
                    <Input
                      id="firstName"
                      value={consultant?.firstName || undefined}
                      required
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </Label>

                  <Label htmlFor="lastName" className="flex-1">
                    Nom
                    <Input
                      id="lastName"
                      value={consultant?.lastName || undefined}
                      required
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </Label>
                </div>
                <div className="flex gap-5">
                  <Label className="flex-1" htmlFor="email">
                    Email
                    <Input
                      id="email"
                      required
                      value={consultant?.email || undefined}
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          email: e.target.value,
                        }))
                      }
                    />
                  </Label>

                  <Label className="flex-1" htmlFor="phone">
                    Téléphone
                    <Input
                      id="phone"
                      required
                      value={consultant?.phone || undefined}
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </Label>
                </div>

                <Label htmlFor="siren" className="flex-1">
                  SIREN
                  <Input
                    id="siren"
                    required
                    value={consultant?.siren || undefined}
                    onChange={(e) =>
                      setConsultant((c) => ({
                        ...c,
                        siren: e.target.value,
                      }))
                    }
                  />
                </Label>

                <div className="flex gap-5 flex-col sm:flex-row">
                  <Label htmlFor="address" className="flex-1">
                    Adresse
                    <Input
                      id="address"
                      required
                      value={consultant?.address || undefined}
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          address: e.target.value,
                        }))
                      }
                    />
                  </Label>

                  <Label htmlFor="postalCode" className="flex-1">
                    Code postal
                    <Input
                      id="postalCode"
                      required
                      value={consultant?.postalCode || undefined}
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </Label>

                  <Label htmlFor="city" className="flex-1">
                    Ville
                    <Input
                      id="city"
                      required
                      value={consultant?.city || undefined}
                      onChange={(e) =>
                        setConsultant((c) => ({
                          ...c,
                          city: e.target.value,
                        }))
                      }
                    />
                  </Label>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center gap-4 mt-8 w-full max-w-lg mx-auto">
            <Button
              type="button"
              className="flex-1"
              variant={"outline"}
              onClick={() => setActiveStep(0)}
            >
              Retour
            </Button>
            <Button type="submit" className="flex-1">
              {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </div>
        </form>
      </div>
    </Stepper>
  );
}
