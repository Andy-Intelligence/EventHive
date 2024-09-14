"use client"
import React from "react";
import Image from "next/image";
import { CalendarIcon, LocateIcon } from "lucide-react";

interface TrendingEventProps {
  img: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}

export default function TrendingEvent({
  img,
  eventTitle,
  eventDate,
  eventLocation,
}: TrendingEventProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-md">
      <div className="flex p-4 space-x-4">
        <div className="flex-shrink-0">
          <Image
            height={120}
            width={120}
            src={img}
            alt={eventTitle}
            className="h-30 w-30 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h4 className="text-xl font-bold text-yellow-800 mb-2 leading-tight">
              {eventTitle}
            </h4>
            <div className="flex items-center text-yellow-700 mb-2">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span className="text-sm">{eventDate}</span>
            </div>
            <div className="flex items-start text-yellow-700">
              <LocateIcon className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm leading-snug">{eventLocation}</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}