"use client";

import { logOut } from "@/features/auth/actions/log-out";
import { Button } from "@/components/button";
import { useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function LogOutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogOut = () => {
    setLoading(true);
    logOut();
  };

  return (
    <Button
      onClick={handleLogOut}
      variant={"destructive"}
      disabled={loading}
      className="!px-2"
    >
      <div suppressHydrationWarning>
        <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
      </div>
    </Button>
  );
}
