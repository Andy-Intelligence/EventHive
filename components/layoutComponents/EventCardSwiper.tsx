"use client";
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import Link from "next/link";
import Footer from "@/components/layoutComponents/Footer";

import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  getUserLocation,
  UserLocation,
  watchUserLocation,
  clearWatch,
  calculateDistance,
} from "@/utils/helpingFunctions/functions";
import { CldImage } from "next-cloudinary";

interface EventProp {
  events?: [];
}

interface Event {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const EventCardSwiper = ({ events }: EventProp) => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
// const [filteredevents, setFilteredEvents] = useState<Event[]>([]);
const [filteredEventsLocation, setFilteredEventsLocation] = useState<any>([]);

  // useEffect(() => {
  //   const fetchUserLocation = async () => {
  //     try {
  //       const location = await getUserLocation();
  //       setUserLocation(location);
  //     } catch (error) {
  //       console.error("Error getting user location:", error);
  //     }
  //   };

  //   fetchUserLocation();
  // }, []);


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



useEffect(() => {
  // Fetch events from your API and filter based on distance
  const fetchEvents = async () => {
    try {
    
      const filteredEvents = events?.filter((event: any) => {
        const distance = calculateDistance(
          userLocation?.latitude || 0,
          userLocation?.longitude || 0,
          event?.eventLatitude,
          event?.eventLongitude
        );
        return distance <= 100; // Filter events within 100 km
      });
      setFilteredEventsLocation(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  if (userLocation) {
    fetchEvents();
  }
}, [userLocation]);








  const gotoEventProfile = (e: any, id: any) => {
    router.push(`/party/${id}`);
  };
  return (
    <div>
      
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {events?.map((event: any) => {
          return (
            <SwiperSlide
              key={event?._id}
              onClick={(e) => gotoEventProfile(e, event?._id)}
              className=""
            >
              <div className="event-image flex flex-col h-full justify-between">
                <div className="flex flex-col items-center h-fit justify-between">
                  <CldImage
                    key={event?._id}
                    src={event?.eventFlyer?.secure_url}
                    alt="event-image"
                    height="960"
                    width="600"
                    //           sizes="(max-width: 768px) 100vw,
                    // (max-width: 1200px) 50vw,
                    // 33vw"
                    // width={"400px"}
                    // height={"400px"}
                    //className="eventFlyerImg object-contain w-full h-auto "
                  />
                </div>
                <div className="event-description flex flex-col items-center mb-2">
                  <h2 className="font-extrabold text-3xl">
                    {event.eventTitle}
                  </h2>
                  <div className="details">
                    <span className="text-sm font-bold">
                      sat, 21 oct@4:20PM
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
