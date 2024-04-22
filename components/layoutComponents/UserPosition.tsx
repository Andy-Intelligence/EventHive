"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserLocation } from "@/utils/helpingFunctions/functions";
import { watchUserLocation, clearWatch } from "@/utils/helpingFunctions/functions";
import { IoLocationSharp } from "react-icons/io5";

const UserPosition = () => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const successCallback = (location: UserLocation) => {
      setUserLocation(location);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Error getting user location:", error);
    };

    const watchId = watchUserLocation(successCallback, errorCallback);

    return () => {
      clearWatch(watchId);
    };
  }, []);

  return (
    <div className="w-full font-sans">
      {userLocation ? (
        <div className="flex items-center justify-center font-bold gap-2 text-lg text-black">
          <IoLocationSharp size={23} />
          <div>Latitude: {userLocation.latitude}</div>
          <div>Longitude: {userLocation.longitude}</div>
        </div>
      ):(<div>Turn On device Location, to view Location...</div>)}
    </div>
  );
};

export default UserPosition;
