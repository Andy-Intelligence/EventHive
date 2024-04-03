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
} from "@/utils/helpingFunctions/functions";



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
        className="mySwiper"
      >
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}

        {events?.map((event: any, index: any) => (
          <SwiperSlide key={event?._id + index}>
            <main
              onClick={(e) => gotoEventProfile(e, event?._id)}
              className=""
            >
              <div className="event-image flex flex-col h-full justify-start gap-2">
                <div className="flex flex-col items-center h-fit justify-center">
                  <CldImage
                    key={event?._id}
                    src={event?.eventFlyer?.secure_url}
                    alt="event-image"
                    height={960}
                    width={600}
                    className="cover"
                  />
                </div>
                <div className="event-description flex flex-col items-center justify-center mb-2">
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
            </main>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
