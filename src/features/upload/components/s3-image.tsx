import React, { useEffect, useState } from "react";

export default function S3Image({
  imagePath,
  ...props
}: React.ComponentProps<"img"> & { imagePath: string }) {
  const [url, setUrl] = useState<string | null>(null);

  if (!imagePath) {
    return null;
  }

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

  return url ? <img src={url} {...props} /> : null;
}
