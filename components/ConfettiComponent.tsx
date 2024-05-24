// "use client"
// "use client";
// import React, { useEffect, useState } from "react";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";

// interface ConfettiComponentProps {
//   duration?: number; // Duration in seconds
// }

// const ConfettiComponent: React.FC<ConfettiComponentProps> = ({
//   duration = 5, // Default duration of 5 seconds
// }) => {
//   const [isRunning, setIsRunning] = useState(true);
//   const { width, height } = useWindowSize();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsRunning(false);
//     }, duration * 1000); // Stop after `duration` seconds

//     return () => clearTimeout(timer); // Cleanup the timer on component unmount
//   }, [duration]);

//   return <>{isRunning && <Confetti width={width} height={height} />}</>;
// };

// export default ConfettiComponent;


"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ConfettiComponentProps {
  duration?: number; // Duration in seconds
}

const ConfettiComponent: React.FC<ConfettiComponentProps> = ({
  duration=10, // Default duration of 5 seconds
}) => {
  const [isRunning, setIsRunning] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0); // Start fading out
      setTimeout(() => setIsRunning(false), 1000); // Completely stop after 1 second fade-out
    }, duration * 1000); // Trigger fade-out after `duration` seconds

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <>
      {isRunning && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity,
            transition: "opacity 1s ease-in-out",
            pointerEvents: "none", // Prevent confetti from blocking interactions
          }}
        >
          <Confetti width={width} height={height} />
        </div>
      )}
    </>
  );
};

export default ConfettiComponent;
