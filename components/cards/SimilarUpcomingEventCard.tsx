"use client"
import React from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function SimilarUpcomingEventCard({ event }: any) {
  return (
    <Link href={`/party/${event._id}`}>
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          {event.eventFlyer?.secure_url && (
            <img
              src={event.eventFlyer.secure_url}
              alt={event.eventTitle}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-800 to-transparent p-4">
            <h3 className="text-xl font-bold text-white truncate">
              {event.eventTitle}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-yellow-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {new Date(event.eventDate).toLocaleDateString()}
            </span>
          </div>
          {event.eventLocation && (
            <div className="flex items-start text-yellow-700">
              <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm leading-snug truncate">
                {event.eventLocation}
              </p>
            </div>
          )}
        </div>
        <div className="px-4 pb-4">
          <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
