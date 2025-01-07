"use client";

import React, { useEffect, useState } from "react";

export default function S3Image({
  imagePath,
  ...props
}: React.ComponentProps<"img"> & { imagePath: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const getUrl = async () => {
      const response = await fetch(`/api/file/${imagePath}`);
      const data = await response.json();
      if (!data.src) {
        return;
      }
      setUrl(data.src);
    };

    getUrl();
  }, [imagePath]);

  if (!imagePath) {
    return null;
  }

  return url ? <img src={url} {...props} /> : null;
}
