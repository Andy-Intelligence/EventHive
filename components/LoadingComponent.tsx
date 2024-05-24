import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      <p className="text-animation mt-4 text-gray-700 font-bold text4xl">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
