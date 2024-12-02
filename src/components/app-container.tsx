import clsx from "clsx";
import React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function AppContainer({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto max-w-screen-md px-5 sm:px-6 lg:px-8 ",
        className,
      )}
      {...props}
    />
  );
}
