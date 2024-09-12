
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import {
  getUserLocation,
  watchUserLocation,
  clearWatch,
  calculateDistance,
  convertToMonth,
  getDayFromDate,
  convertToTime,
} from "@/utils/helpingFunctions/functions";

// Define the Event interface
interface Event {
  _id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventFlyer?: {
    secure_url: string;
  };
  eventLatitude: number;
  eventLongitude: number;
}

// Define the CarouselProps interface for the component's props
interface CarouselProps {
  events: Event[];
}

const Carousel: React.FC<CarouselProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [userLocation, setUserLocation] = useState<any | null>(null);
  const [filteredEventsLocation, setFilteredEventsLocation] = useState<Event[]>(
    []
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Watch for user location
  useEffect(() => {
    const successCallback = (location: any) => {
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

  // Filter events based on location
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const filteredEvents = events?.filter((event) => {
          const distance = calculateDistance(
            userLocation?.latitude || 0,
            userLocation?.longitude || 0,
            event?.eventLatitude,
            event?.eventLongitude
          );
          return distance <= 100;
        });
        setFilteredEventsLocation(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (userLocation) {
      fetchEvents();
    }
  }, [userLocation, events]);

  const gotoEventProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    router.push(`/party/${id}`);
  };

  // Carousel controls
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  // Swipeable handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    swipeDuration: 500,
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Mouse/touch drag controls
  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    setDragStartX(clientX);
  };

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const currentX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
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
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12 bg-gradient-to-br from-yellow-100 to-yellow-100 rounded-3xl shadow-xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-yellow-900">
        Upcoming Events
      </h2>
      <div
        className="relative overflow-hidden"
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
        <div
          className="flex transition-all duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${
              currentIndex * 100
            }% + ${dragOffset}px))`,
          }}
        >
          {events?.map((event, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 w-full p-4 transition-all duration-500 ${
                index === currentIndex
                  ? "scale-100 opacity-100 z-10"
                  : "scale-95 opacity-50"
              }`}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105">
                <div className="relative h-80">
                  <img
                    src={event?.eventFlyer?.secure_url || "/placeholder.png"} // Fallback for missing images
                    alt={event.eventTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-2 shadow-md">
                    <div className="text-3xl font-bold text-yellow-600">
                      {getDayFromDate(event?.eventDate)}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {convertToMonth(event?.eventDate)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {event.eventTitle}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span>
                      {new Date(event?.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaClock className="mr-2" />
                    <span>{convertToTime(event?.eventTime)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <IoLocationSharp className="mr-2" />
                    <span>{event?.eventLocation}</span>
                  </div>
                  <button
                    onClick={(e) => gotoEventProfile(e, event?._id)}
                    className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-yellow-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-yellow-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
