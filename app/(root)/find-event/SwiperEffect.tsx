"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { CldImage } from "next-cloudinary";
import {
  getUserLocation,
  UserLocation,
  watchUserLocation,
  clearWatch,
  calculateDistance,
  convertToMonth,
  getDayFromDate,
  convertToTime,
  replaceHttpWithHttps,
  formatAttendanceNumber,
} from "@/utils/helpingFunctions/functions";
import { IoLocationSharp } from "react-icons/io5";
import Carousel from "@/components/Carousel";

interface Event {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface EventProp {
  events?: any[]; // Specify the type of the 'events' array
}

export default function SwiperEffect({
  query,
  currentPage,
  events,
}: {
  query?: string;
  currentPage?: number;
  events: any;
}) {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [filteredEventsLocation, setFilteredEventsLocation] = useState<any>([]);

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

  const gotoEventProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    router.push(`/party/${id}`);
  };

  return (
    <div className="relative p-4">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper min-h-[50vh]"
      >
        {events?.map((event: any, index: any) => (
          <SwiperSlide key={event?._id + index}>
            <main
              onClick={(e) => gotoEventProfile(e, event?._id)}
              className="bg-white p-2 rounded-lg"
            >
              <div className="event-image flex flex-col h-full justify-start gap-2">
                <div className="relative flex flex-col items-center overflow-hidden justify-center">
                  <CldImage
                    key={event?._id}
                    src={event?.eventFlyer?.secure_url}
                    alt="event-image"
                    height={960}
                    width={960}
                    priority
                    crop="fill"
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg">
                    <div className="text-xl font-bold text-white">
                      {getDayFromDate(event?.eventDate)}
                    </div>
                    <div>{convertToMonth(event?.eventDate)}</div>
                  </div>
                </div>
                <div className="event-description flex flex-col items-start justify-start mb-2">
                  <h2 className="font-bold text-3xl">{event.eventTitle}</h2>
                  <div className="details">
                    <span className="text-sm font-normal">
                      {convertToTime(event?.eventDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-start font-normal gap-1 text-sm w-full text-black py-2">
                    <div className="flex items-center justify-center">
                      <IoLocationSharp size={15} />
                    </div>
                    <div className="flex items-center justify-center">
                      {event.eventLocation}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Carousel/> */}
    </div>
  );
}


 