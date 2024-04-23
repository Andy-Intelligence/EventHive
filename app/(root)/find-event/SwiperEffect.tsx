'use client'
import React, { useEffect, useRef, useState } from "react";
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
} from "@/utils/helpingFunctions/functions";

import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

//import { useGSAP } from "@gsap/react";
    
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase);

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



export default function SwiperEffect({events}:any) {
const router = useRouter()
 const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
 // const [filteredevents, setFilteredEvents] = useState<Event[]>([]);
 const [filteredEventsLocation, setFilteredEventsLocation] = useState<any>([]);


//  useEffect(() => {
//   const carousel = carouselRef.current;
//   const slides = carousel?.querySelectorAll('.owl-carousel > div');
//   if (!slides) return;


  
//   // gsap.set(slides, { xPercent: 100 }); // Initial position all slides



  
//   return () => {
//     // Clean up GSAP animations if needed
//   };
// }, []);


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
              className=""
            >
              <div className="event-image flex flex-col h-full justify-start gap-2">
                <div className="relative flex flex-col items-center h-fit justify-center">
                  <CldImage
                    key={event?._id}
                    src={event?.eventFlyer?.secure_url}
                    alt="event-image"
                    height={960}
                    width={600}
                    className="cover"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center "><div className="text-lg font-bold text-white">{getDayFromDate(event?.eventDate)}</div> <div>{convertToMonth(event?.eventDate)}</div></div>
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
                  <div></div>
                </div>
              </div>
            </main>
          </SwiperSlide>
        ))}
      </Swiper>
   
    </div>
  );
}
