
"use client";
import LoadingComponent from "@/components/LoadingComponent";
import EventCard from "@/components/cards/EventCard";
import SimilarUpcomingEventCard from "@/components/cards/SimilarUpcomingEventCard";
import { MapComponent } from "@/components/externalApiViews/Map";
import Button from "@/components/layoutComponents/Button";
import CategoryButton from "@/components/layoutComponents/CategoryButton";
import CountDown from "react-countdown";
import useWindowSize from "react-use/lib/useWindowSize";
import { IoClose } from "react-icons/io5";
import Countdown, { zeroPad } from "react-countdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Confetti from "react-confetti";
import {
  convertTimeToCustomFormat,
  convertToMonth,
  formatAmount,
  formatAttendanceNumber,
  formatDateTime,
  formatNumberToNaira,
  getDayFromDate,
  replaceHttpWithHttps,
} from "@/utils/helpingFunctions/functions";
import { MapProvider } from "@/utils/providers/MapProvider";
import { GoogleMap } from "@react-google-maps/api";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  BsChat,
  BsCheckCircle,
  BsExclamationCircle,
  BsTelephone,
} from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import EventCountDownCompleted from "@/components/EventCountDownCompleted";
import ConfettiComponent from "@/components/ConfettiComponent";
import CommentsSection from "@/components/CommentsSection";
import { FaStar } from "react-icons/fa";

const getEvent = async (id: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("There was an Error fetching");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching the event", error);
  }
};
const fetchUsersAttendingEvent = async (id: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event-attendance-count/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("There was an Error fetching Attendance Count");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching the Attendance Count", error);
  }
};


export default function Page({ params }: { params: { id: string } }) {
  const { width, height } = useWindowSize();
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [copied, setCopied] = useState(false);
    const [similarEvents, setSimilarEvents] = useState<any>([]);
    const [similarUpcomingEvents, setSimilarUpcomingEvents] = useState<any>([]);
     const [showEventStarted, setShowEventStarted] = useState(false);

     const handleComplete = () => {
       setShowEventStarted(true);
     };

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch event details
          console.log(params);
          const { event, similarEvents ,similarUpcomingEvents} = await getEvent(params?.id);
          setEvent(event);
          setSimilarEvents(similarEvents);
          setSimilarUpcomingEvents(similarUpcomingEvents)
          console.log(event);
          // Fetch users attending the event
          const users = await fetchUsersAttendingEvent(event?._id);
          setUsers(users);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      if (params) {
        fetchData();
      }
    }, [params]);

    const copyPhoneNumber = () => {
      if (event?.eventHost?.mobileNumber) {
        navigator.clipboard
          .writeText(event?.eventHost?.mobileNumber)
          .then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000); // Reset the 'copied' state after 2 seconds
          })
          .catch((error) => {
            console.error("Failed to copy:", error);
          });
      }
    };

  

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <div></div>;
    } else {
      return (
        <div className="flex space-x-4 font-bold text-2xl text-black">
          {[
            { label: "days", value: days },
            { label: "hours", value: hours },
            { label: "minutes", value: minutes },
            { label: "seconds", value: seconds },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md"
            >
              <span className="text-4xl text-white">{zeroPad(value)}</span>
              <span className="text-xs text-blue-100 mt-1">{label}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  if (!event) {
    return <LoadingComponent />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Countdown Timer */}
        {!showEventStarted && (
          <div className="w-full flex justify-center p-6 bg-white rounded-xl shadow-lg">
            <Countdown
              date={new Date(event.eventDate)}
              renderer={renderer}
              onComplete={handleComplete}
            />
          </div>
        )}

        {/* Event Image Section */}
        <section className="relative">
          {event.eventFlyer?.secure_url && (
            <CldImage
              key={event._id}
              src={event.eventFlyer.secure_url}
              alt="event-thumbnail"
              priority
              height={960}
              width={600}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          )}
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">
              {getDayFromDate(event.eventDate)}
            </div>
            <div className="text-lg">{convertToMonth(event.eventDate)}</div>
          </div>
        </section>

        {/* Event Info Section */}
        <section className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <CategoryButton
              text={event.eventCategory}
              category={event.eventCategory}
            />
            <CategoryButton text={"5.0"} category={"StarRating"} />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            <CountUp end={event.eventFee} prefix="₦" />
            <span className="font-normal text-gray-500 text-sm ml-1">
              /Person
            </span>
          </div>
        </section>

        {/* Organizer Info */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <Image
            src={replaceHttpWithHttps(event.eventHost?.image)}
            alt="Organizer"
            className="w-16 h-16 rounded-full"
            height={64}
            width={64}
          />
          <div className="flex-grow">
            <h3 className="font-bold text-xl">{event.eventHost?.username}</h3>
            <p className="text-gray-600">{event.eventOrganiser}</p>
          </div>
          <div className="flex space-x-3">
            <button
              className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-200 transition duration-300"
              onClick={copyPhoneNumber}
            >
              <BsTelephone size={20} />
            </button>
            <button className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition duration-300">
              <BsChat size={20} />
            </button>
          </div>
          {copied && <p className="text-green-500 ml-2">Copied!</p>}
        </div>

        {/* Event Details Section */}
        <section className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              {event.eventTitle}
            </h1>
            <h3 className="text-xl font-semibold text-gray-600 mt-2">
              {event.eventTopic}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {event.orders
                .reverse()
                .slice(0, 3)
                .map((user: any, index: number) => (
                  <Image
                    key={index}
                    className={`h-12 w-12 rounded-full border-2 border-white ${
                      index !== 0 ? "-ml-4" : ""
                    }`}
                    src={replaceHttpWithHttps(user?.userId?.image)}
                    alt="attendee"
                    height={48}
                    width={48}
                    style={{ zIndex: event.orders.length - index }}
                  />
                ))}
              <span className="ml-3 text-lg font-semibold text-gray-700">
                {formatAttendanceNumber(event.orders.length)} Going
              </span>
            </div>
            <button className="font-bold text-blue-600 hover:text-blue-800 transition duration-300">
              Invite
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <FiClock className="mr-2" size={20} />
                <span>
                  {convertTimeToCustomFormat(event.eventDate)} {event.eventTime}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <IoLocationOutline className="mr-2" size={20} />
                <span>{event.eventLocation}</span>
              </div>
            </div>
            <div className="flex justify-end items-center">
              {event.eventVerification ? (
                <div className="flex items-center text-green-500">
                  <BsCheckCircle className="mr-2" size={20} />
                  <span className="font-semibold">Verified</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <BsExclamationCircle className="mr-2" size={20} />
                  <span className="font-semibold">Not verified</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Description & Tips
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {event.eventDescription}
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="bg-gray-50 rounded-lg shadow"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-100">
                <h3 className="text-lg font-bold text-gray-800">
                  Event Details
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <ul className="space-y-2 text-gray-600">
                  {event.eventEnquiryPhoneNumber && (
                    <li className="flex items-center">
                      <span className="font-semibold mr-2">Enquiry:</span>
                      {event.eventEnquiryPhoneNumber}
                    </li>
                  )}
                  {event.eventWebsite && (
                    <li className="flex items-center">
                      <span className="font-semibold mr-2">Website:</span>
                      <a
                        href={event.eventWebsite}
                        className="text-blue-500 hover:underline"
                      >
                        {event.eventWebsite}
                      </a>
                    </li>
                  )}
                  {/* ... (other event details) */}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Comments & Reviews (33)
            </h3>
            <Drawer>
              <DrawerTrigger>
                <div className="p-4 rounded-lg flex items-center w-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition duration-300">
                  <Image
                    src={replaceHttpWithHttps(event.eventHost?.image)}
                    alt="Organizer"
                    className="w-16 h-16 rounded-full mr-4"
                    height={64}
                    width={64}
                  />
                  <div className="flex-grow">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      I am starting to think that this event has a future as the
                      biggest event
                    </p>
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-5 h-5 ${
                            4 >= star ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-2xl font-bold">
                    Comments and Reviews
                  </DrawerTitle>
                  <DrawerDescription>
                    Get comments about the event
                  </DrawerDescription>
                </DrawerHeader>
                <CommentsSection />
                <DrawerFooter>
                  <DrawerClose asChild>
                    <button className="flex items-center justify-center bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300">
                      <IoClose size={24} />
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </section>

        {/* Ticket Purchase Section */}
        <section className="text-center space-y-4">
          <div className="text-sm font-bold text-gray-600">
            TICKET PRICES ARE INCLUSIVE OF EventHive FEES
          </div>
          <div className="text-gray-500">
            Be part of an event without hesitating
          </div>
          <Button
            text="Get Ticket"
            color="bg-blue-600 hover:bg-blue-700  font-bold py-3 px-8 rounded-full transition duration-300"
            onClick={() => router.push(`/party/pay/${event?._id}`)}
          />
        </section>

        {/* Event ID Section */}
        <div className="text-center text-gray-500">
          <p>Event ID: {event?._id}</p>
        </div>

        {/* Recommended Events Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">More Like This</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarEvents.map((similarEvent: any) => (
              <EventCard key={similarEvent?._id} event={similarEvent} />
            ))}
          </div>
        </section>

        {/* Similar Upcoming Events */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Similar Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {similarEvents.map((similarUpcomingEvent: any) => (
              <SimilarUpcomingEventCard
                key={similarUpcomingEvent._id}
                event={similarUpcomingEvent}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}