'use client'
import * as React from "react";

import  { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

// import required modules
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




import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { IoLocationSharp } from 'react-icons/io5';


import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin);

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
  query: string;
  currentPage: number;
  events:any;
}) {
  // console.log(events)
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  // const [filteredevents, setFilteredEvents] = useState<Event[]>([]);
  const [filteredEventsLocation, setFilteredEventsLocation] = useState<any>([]);

  console.log(events);
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

  const gotoEventProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent event propagation to avoid triggering unwanted card swipes
    console.log("kkk");
    router.push(`/party/${id}`);
  };

  return (
    <div className="relative">
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
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper min-h-[50vh]"
      >
        {events?.map((event: any, index: any) => (
          <SwiperSlide key={event?._id + index}>
            <main
              onClick={(e) => gotoEventProfile(e, event?._id)}
              className="bg-white p-2 rounded-lg max-h-[60vh] border-2 border-[rgba(34,34,34,0.1)]"
            >
              <div className="event-image flex flex-col h-full justify-start gap-2">
                <div className="relative flex flex-col items-center  overflow-clip justify-center">
                  <CldImage
                    key={event?._id}
                    src={event?.eventFlyer?.secure_url}
                    alt="event-image"
                    height={960}
                    width={960}
                    priority
                    // preserveTransformations
                    crop="fill"
                    // sizes="100vw 100vh"
                    className="cover rounded-lg max-h-[40vh]"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg ">
                    <div className="text-xl font-bold  text-white">
                      {getDayFromDate(event?.eventDate)}
                    </div>{" "}
                    <div>{convertToMonth(event?.eventDate)}</div>
                  </div>
                </div>
                <div className="event-description flex flex-col items-center justify-center mb-2">
                  <h2 className="font-extrabold text-3xl">
                    {event.eventTitle}
                  </h2>
                  <div className="details">
                    <span className="text-sm font-bold">
                      {/* sat, 21 oct@4:20PM */}
                      {convertToTime(event?.eventDate)}
                    </span>
                  </div>
                  <div className="w-full flex items-start">
                    <div className="flex items-center justify-center ">
                      <div className="flex items-center justify-center ">
                        {event?.orders
                          .reverse()
                          .slice(0, 3)
                          .map((user: any, index: number) => {
                            return (
                              <img
                                key={index}
                                className={`h-[30px] w-[30px] rounded-full ${
                                  index !== 0 ? "-ml-2" : ""
                                }`}
                                src={replaceHttpWithHttps(user?.userId?.image)}
                                alt="pics"
                                style={{ zIndex: event.orders.length - index }} // Adjust the zIndex dynamically
                              />
                            );
                          })}
                      </div>

                      <span className="ml-1 flex items-center justify-center text-[13px] text-black font-[400] break-all whitespace-normal">
                        {" "}
                        {formatAttendanceNumber(event?.orders?.length)} Going
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-start font-bold gap-1 text-sm w-full text-black py-2">
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
      
    </div>
  );
}











//  {
//    <Carousel className="w-full max-w-sm">
//      <CarouselContent className="-ml-1">
//        {events?.map((event, index) => (
//          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
//            <div className="p-1">
//              {/* <Card> */}
//              <CardContent className="flex aspect-square items-center justify-center p-6">
//                <main
//                  onClick={(e) => gotoEventProfile(e, event?._id)}
//                  className="bg-white p-2 rounded-lg max-h-[60vh] border-2 border-[rgba(34,34,34,0.1)]"
//                >
//                  <div className="event-image flex flex-col h-full justify-start gap-2">
//                    <div className="relative flex flex-col items-center  overflow-clip justify-center">
//                      <CldImage
//                        key={event?._id}
//                        src={event?.eventFlyer?.secure_url}
//                        alt="event-image"
//                        height={960}
//                        width={960}
//                        // preserveTransformations
//                        crop="fill"
//                        // sizes="100vw 100vh"
//                        className="cover rounded-lg max-h-[40vh]"
//                      />
//                      <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg ">
//                        <div className="text-xl font-bold  text-white">
//                          {getDayFromDate(event?.eventDate)}
//                        </div>{" "}
//                        <div>{convertToMonth(event?.eventDate)}</div>
//                      </div>
//                    </div>
//                    <div className="event-description flex flex-col items-center justify-center mb-2">
//                      <h2 className="font-extrabold text-3xl">
//                        {event.eventTitle}
//                      </h2>
//                      <div className="details">
//                        <span className="text-sm font-bold">
//                          {/* sat, 21 oct@4:20PM */}
//                          {convertToTime(event?.eventDate)}
//                        </span>
//                      </div>
//                      <div className="w-full flex items-start">
//                        <div className="flex items-center justify-center ">
//                          <div className="flex items-center justify-center ">
//                            {event?.orders
//                              .reverse()
//                              .slice(0, 3)
//                              .map((user: any, index: number) => {
//                                return (
//                                  <img
//                                    key={index}
//                                    className={`h-[30px] w-[30px] rounded-full ${
//                                      index !== 0 ? "-ml-2" : ""
//                                    }`}
//                                    src={replaceHttpWithHttps(
//                                      user?.userId?.image
//                                    )}
//                                    alt="pics"
//                                    style={{
//                                      zIndex: event.orders.length - index,
//                                    }} // Adjust the zIndex dynamically
//                                  />
//                                );
//                              })}
//                          </div>

//                          <span className="ml-1 flex items-center justify-center text-[13px] text-black font-[400] break-all whitespace-normal">
//                            {" "}
//                            {formatAttendanceNumber(event?.orders?.length)} Going
//                          </span>
//                        </div>
//                      </div>

//                      <div className="flex items-center justify-start font-bold gap-1 text-sm w-full text-black py-2">
//                        <div className="flex items-center justify-center">
//                          <IoLocationSharp size={15} />
//                        </div>
//                        <div className="flex items-center justify-center">
//                          {event.eventLocation}
//                        </div>
//                      </div>
//                    </div>
//                  </div>
//                </main>
//              </CardContent>
//              {/* </Card> */}
//            </div>
//          </CarouselItem>
//        ))}
//      </CarouselContent>
//      <CarouselPrevious />
//      <CarouselNext />
//    </Carousel>;
//  }