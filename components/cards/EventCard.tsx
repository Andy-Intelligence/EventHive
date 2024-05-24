"use client"
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ event }:any) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link href={`/party/${event._id}`}>
        {/* <a> */}
          <Image
            src={event.eventFlyer.secure_url}
            alt={`${event.eventTitle} flyer`}
            width={400}
            height={250}
            className="w-full h-60 object-cover object-top"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{event.eventTitle}</div>
            {/* <p className="text-gray-700 text-base">{event.eventDescription}</p> */}
          </div>
          <div className="px-6 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {new Date(event.eventDate).toLocaleDateString()}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {event.eventLocation}
            </span>
          </div>
        {/* </a> */}
      </Link>
    </div>
  );
};

export default EventCard;
