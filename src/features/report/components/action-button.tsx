"use client";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import React from "react";

type ActionButtonProps = React.ComponentProps<"button"> & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  renderForm: () => React.ReactNode;
  modalTitle: string;
};

export const ActionButton = ({
  isOpen,
  setIsOpen,
  renderForm,
  modalTitle,
  ...props
}: ActionButtonProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button {...props} onClick={() => setIsOpen(true)} />
      </DialogTrigger>

      <DialogContent>
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader className="mb-5">
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>
          <div className="py-4 pb-0">
            {renderForm()}

            <Button
              className="w-full my-5"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
