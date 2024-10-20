"use client";

import { useEffect } from "react";

export const CalendlyEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js",
    );
    head?.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url + "?hide_event_type_details=1&hide_gdpr_banner=1"}
      style={{ height: "500px", minHeight: "500px", width: "100%" }}
    ></div>
  );
};
