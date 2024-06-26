"use client"
import { useState,useRef } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import BeachVibe from "@/public/assets/beachvibe.jpg";
import * as React from "react";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

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

const images = [
  BeachVibe.src,
  BeachVibe.src,
  BeachVibe.src,
  BeachVibe.src,
  BeachVibe.src,

  // Add more image paths here
];

interface Event {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface EventProp {
  events?: any[]; // Specify the type of the 'events' array
}

const Carousel = ({
  query,
  currentPage,
  events,
}: {
  query?: string;
  currentPage?: number;
  events: any;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    // preventDefaultTouchmoveEvent: true,
    swipeDuration:100,
    delta:0,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleMouseDown = (event:any) => {
    setDragging(true);
    setDragStartX(event.clientX || event.touches[0].clientX);
  };

  const handleMouseMove = (event:any) => {
    if (!dragging) return;
    const currentX = event.clientX || event.touches[0].clientX;
    setDragOffset(currentX - dragStartX);
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (dragOffset > 50) {
      prevSlide();
    } else if (dragOffset < -50) {
      nextSlide();
    }
    setDragOffset(0);
  };

  return (
    // <div
    //   className="relative w-full max-w-4xl mx-auto"
    //   {...handlers}
    //   ref={containerRef}
    //   onMouseDown={handleMouseDown}
    //   onTouchStart={handleMouseDown}
    //   onMouseMove={handleMouseMove}
    //   onTouchMove={handleMouseMove}
    //   onMouseUp={handleMouseUp}
    //   onTouchEnd={handleMouseUp}
    //   onMouseLeave={() => setDragging(false)}
    // >
    //   <div className="overflow-hidden relative">
    //     <div
    //       className="flex transition-transform duration-500 ease-in-out"
    //       style={{
    //         transform: `translateX(calc(-${
    //           currentIndex * 80
    //         }% + ${dragOffset}px))`,
    //       }}
    //     >
    //       {/* {images.map((image, index) => ( */}
    //       {events?.map((event: any, index: any) => (
    //         <div
    //           key={index}
    //           className={`relative flex-shrink-0 w-4/5 md:w-2/3 h-64 mx-2 transform transition-transform duration-500 ease-in-out ${
    //             index === currentIndex
    //               ? "scale-105 bg-blue-200 z-10"
    //               : "scale-90 bg-gray-200"
    //           }`}
    //           style={{
    //             marginLeft: index === 0 ? "10%" : "0",
    //             marginRight: index === events.length - 1 ? "10%" : "0",
    //           }}
    //         >
    //           <img
    //             onClick={(e) => gotoEventProfile(e, event?._id)}
    //             src={event?.eventFlyer?.secure_url}
    //             alt={`Slide ${index}`}
    //             className="w-full h-full object-cover object-top"
    //           />
    //           <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg">
    //             <div className="text-xl font-bold text-white">
    //               {getDayFromDate(event?.eventDate)}
    //             </div>
    //             <div>{convertToMonth(event?.eventDate)}</div>
    //           </div>
    //           <h2 className="font-bold text-3xl">{event.eventTitle}</h2>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <button
    //     onClick={prevSlide}
    //     className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    //   >
    //     ‹
    //   </button>
    //   <button
    //     onClick={nextSlide}
    //     className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    //   >
    //     ›
    //   </button>
    // </div>
    // <div
    //   className="relative w-full max-w-4xl mx-auto"
    //   {...handlers}
    //   ref={containerRef}
    //   onMouseDown={handleMouseDown}
    //   onTouchStart={handleMouseDown}
    //   onMouseMove={handleMouseMove}
    //   onTouchMove={handleMouseMove}
    //   onMouseUp={handleMouseUp}
    //   onTouchEnd={handleMouseUp}
    //   onMouseLeave={() => setDragging(false)}
    // >
    //   <div className="overflow-hidden relative">
    //     <div
    //       className="flex transition-transform duration-500 ease-in-out"
    //       style={{
    //         transform: `translateX(calc(-${
    //           currentIndex * 80
    //         }% + ${dragOffset}px))`,
    //       }}
    //     >
    //       {events?.map((event: any, index: any) => (
    //         <div
    //           key={index}
    //           className={`relative flex-shrink-0 w-4/5 md:w-2/3 h-64 mx-2 transform transition-transform duration-500 ease-in-out ${
    //             index === currentIndex
    //               ? "scale-105 bg-blue-200 z-10"
    //               : "scale-90 bg-gray-200"
    //           }`}
    //           style={{
    //             marginLeft: index === 0 ? "10%" : "0",
    //             marginRight: index === events.length - 1 ? "10%" : "0",
    //           }}
    //         >
    //           <img
    //             onClick={(e) => gotoEventProfile(e, event?._id)}
    //             src={event?.eventFlyer?.secure_url}
    //             alt={`Slide ${index}`}
    //             className="w-full h-full object-cover object-top"
    //           />
    //           <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
    //             <h2 className="font-bold text-xl">{event.eventTitle}</h2>
    //           </div>
    //           <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg">
    //             <div className="text-xl font-bold text-white">
    //               {getDayFromDate(event?.eventDate)}
    //             </div>
    //             <div>{convertToMonth(event?.eventDate)}</div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <button
    //     onClick={prevSlide}
    //     className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    //   >
    //     ‹
    //   </button>
    //   <button
    //     onClick={nextSlide}
    //     className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    //   >
    //     ›
    //   </button>
    // </div>
    <div
      className="relative w-full max-w-4xl mx-auto "
      {...handlers}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onMouseLeave={() => setDragging(false)}
    >
      <div className="overflow-hidden relative py-5 ">
        <div
          className="flex transition-transform duration-500 ease-in-out  "
          style={{
            transform: `translateX(calc(-${
              currentIndex * 80
            }% + ${dragOffset}px))`,
          }}
        >
          {events?.map((event: any, index: any) => (
            <div
              key={index}
              className={`rounded-lg relative flex-shrink-0 w-4/5 md:w-2/3 mx-2 transform transition-transform duration-500 ease-in-out ${
                index === currentIndex
                  ? "scale-105 bg-white z-10 shadow-md  shadow-[rgba(34,34,34,0.1)]"
                  : "scale-90 bg-white"
              }`}
              style={{
                marginLeft: index === 0 ? "10%" : "0",
                marginRight: index === events.length - 1 ? "10%" : "0",
              }}
            >
              <img
                onClick={(e) => gotoEventProfile(e, event?._id)}
                src={event?.eventFlyer?.secure_url}
                alt={`Slide ${index}`}
                className="w-full h-64 object-cover object-top rounded-t-lg"
              />
              <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-sm text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg">
                <div className=" font-bold text-white">
                  {getDayFromDate(event?.eventDate)}
                </div>
                <div>{convertToMonth(event?.eventDate)}</div>
              </div>
              {index === currentIndex ? (
                <h2 className="text-center mt-2 font-bold text-xl mb-4">
                  {event.eventTitle}
                </h2>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full"
      >
        ›
      </button> */}
    </div>
  );
};

export default Carousel;
