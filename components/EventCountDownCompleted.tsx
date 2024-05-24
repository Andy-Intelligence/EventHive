"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

interface EventCountDownCompletedProps {
  eventId: string;
  eventTitle: string;
}

export default function EventCountDownCompleted({
  eventId,
  eventTitle,
}: EventCountDownCompletedProps) {
  const [timeLeft, setTimeLeft] = useState<number>(2); // Countdown from 10 seconds for demo purposes
  const router = useRouter();
  const animationRef = useRef<HTMLDivElement>(null);
const { width, height } = useWindowSize();
  useEffect(() => {
    if (timeLeft === 0) {
      // Display the animation when the timer reaches zero
      if (animationRef.current) {
        animationRef.current.style.display = "block";
      }

      // Hide the animation after a few seconds (optional)
    //   setTimeout(() => {
    //     if (animationRef.current) {
    //       animationRef.current.style.display = "none";
    //     }
    //   }, 5000); // Animation duration
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  

  return (
    <div className="countdown-container">
      {timeLeft > 0 ? (
        <div className="countdown-timer">
          <h2 className="text-xl font-bold">Event starts in:</h2>
          <div className="timer font-bold text-[2rem]">{timeLeft}s</div>
        </div>
      ) : (
        <div ref={animationRef} className="hidden animation-container">
          <h2 className="text-3xl font-bold text-center">Event Started!</h2>
          <p className="text-center">{eventTitle}</p>
          <div className="confetti">
            <Confetti   width={width} height={height} />
          </div>
        </div>
      )}
    </div>
  );
}
