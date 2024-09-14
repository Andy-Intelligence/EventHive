"use client"
import React from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

interface OffbeatEventProps {
  img: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventDescription: string;
}

export default function OffbeatEvent({
  img,
  eventTitle,
  eventDate,
  eventLocation,
  eventDescription,
}: OffbeatEventProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 max-w-2xl mx-auto">
      <div className="relative">
        <Image
          className="w-full h-64 object-cover"
          src={img}
          height={960}
          width={600}
          alt={eventTitle}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-800 to-transparent p-4">
          <h3 className="text-2xl font-bold text-white">{eventTitle}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-yellow-700">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{eventDate}</span>
          </div>
          <div className="flex items-center text-yellow-700">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{eventLocation}</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          {eventDescription.split(" ").slice(0, 20).join(" ")}
          {eventDescription.split(" ").length > 20 && "..."}
        </p>
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors duration-300 shadow-md hover:shadow-lg">
          Read More
        </button>
      </div>
    </div>
  );
}
