"use client"
import React, { useEffect, useRef } from "react";

const Marquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    let offset = 0;

    const scrollMarquee = () => {
      if (marqueeElement) {
        offset--;
        if (offset < -marqueeElement.scrollWidth) {
          offset = marqueeElement.clientWidth;
        }
        marqueeElement.style.transform = `translateX(${offset}px)`;
      }
      requestAnimationFrame(scrollMarquee);
    };

    scrollMarquee();
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={marqueeRef} className="inline-block will-change-transform">
        The Stallion is current ongoing at 6 Lilly Avenue
      </div>
    </div>
  );
};

export default Marquee;
