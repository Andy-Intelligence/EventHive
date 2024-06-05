"use client";
import React, { useEffect } from "react";

// Extend the global Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  client: string;
  slot: string;
  style?: React.CSSProperties;
  layout?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ client, slot, style, layout }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
    />
  );
};

export default AdSense;
