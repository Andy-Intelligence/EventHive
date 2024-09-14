"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

const EventCard = ({ event }: any) => {
  return (
    <Link href={`/party/${event._id}`}>
      <div className="max-w-sm bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <Image
            src={event.eventFlyer.secure_url}
            alt={`${event.eventTitle} flyer`}
            width={400}
            height={250}
            className="w-full h-60 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-800 to-transparent p-4">
            <h2 className="text-xl font-bold text-white truncate">
              {event.eventTitle}
            </h2>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-yellow-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {new Date(event.eventDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-yellow-700">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium truncate max-w-[150px]">
                {event.eventLocation}
              </span>
            </div>
          </div>
          <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors duration-300">
            View Event Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
