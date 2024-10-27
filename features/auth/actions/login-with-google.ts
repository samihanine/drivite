"use server";

import { googleClient } from "@/lib/google";

export const loginWithGoogle = async ({ state }: { state?: string }) => {
  let scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return googleClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    state,
  });
};
