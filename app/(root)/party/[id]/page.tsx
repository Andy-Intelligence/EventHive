
"use client";
import LoadingComponent from "@/components/LoadingComponent";
import EventCard from "@/components/cards/EventCard";
import SimilarUpcomingEventCard from "@/components/cards/SimilarUpcomingEventCard";
import { MapComponent } from "@/components/externalApiViews/Map";
import Button from "@/components/layoutComponents/Button";
import CategoryButton from "@/components/layoutComponents/CategoryButton";
import CountDown from 'react-countdown'
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
    const res = await fetch(`http://localhost:3000/api/event/${id}`, {
      cache: "no-store",
    });

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
      `http://localhost:3000/api/event-attendance-count/${id}`,
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
      // Render the event started message
      return (
        // <div className="animation-container flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        //   <h2 className="text-4xl font-bold text-center text-green-500 mb-2">
        //     The Event Started!
        //   </h2>
        //   <p className="text-center text-xl text-gray-700 mb-4">{event.eventTitle}</p>
        //   <ConfettiComponent duration={5} />
        // </div>
        <div></div>
      );
    } else {
      // Render the countdown timer
      return (
        <div className="flex space-x-2 font-bold text-xl text-black">
          <div className="flex flex-col items-center p-2 bg-blue-200 rounded-lg">
            <span className="text-4xl">{zeroPad(days)}</span>
            <span className="text-sm">days</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-blue-200 rounded-lg">
            <span className="text-4xl">{zeroPad(hours)}</span>
            <span className="text-sm">hours</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-blue-200 rounded-lg">
            <span className="text-4xl">{zeroPad(minutes)}</span>
            <span className="text-sm">minutes</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-blue-200 rounded-lg">
            <span className="text-4xl">{zeroPad(seconds)}</span>
            <span className="text-sm">seconds</span>
          </div>
        </div>
      );
    }
  };

  if (!event) {
    return <LoadingComponent />;
  }

  return (
    <div className="p-4 flex flex-col space-y-8 font-poppins items-center justify-center bg-gray-100 min-h-screen">
      {/* Event Image Section */}
      {/* {event?.eventDate} */}
      <div>
        {!showEventStarted ? (
          <div className="w-full countdown-container flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
            <Countdown
              // date={Date.now() + 5000}
              date={new Date(event.eventDate)}
              renderer={renderer}
              onComplete={handleComplete}
            />
          </div>
        ) : (
          // <div className="animation-container flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          //   <h2 className="text-4xl font-bold text-center text-green-500 mb-2">
          //     Event Ongoing!
          //   </h2>
          //   <p className="text-center text-xl text-gray-700 mb-4">
          //     {event.eventTitle}
          //   </p>
          //   <ConfettiComponent duration={5} />
          // </div>
          <div></div>
        )}
      </div>
      <section className="relative w-full max-w-4xl mx-auto">
        {event.eventFlyer?.secure_url && (
          <CldImage
            key={event._id}
            src={event.eventFlyer.secure_url}
            alt="event-thumbnail"
            priority
            height={960}
            width={600}
            className="cover rounded-lg"
          />
        )}
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg">
          <div className="text-xl font-bold text-white">
            {getDayFromDate(event.eventDate)}
          </div>
          <div>{convertToMonth(event.eventDate)}</div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="flex justify-between items-start gap-3 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <CategoryButton
            text={event.eventCategory}
            category={event.eventCategory}
          />
          <CategoryButton text={"5.0"} category={"StarRating"} />
        </div>
        <div className="text-xl font-bold text-black">
          <CountUp end={event.eventFee} prefix="₦" />
          <span className="font-normal text-gray-500 text-sm">/Person</span>
        </div>
      </section>
      <div className="p-4 rounded-lg flex items-center w-full bg-white border border-gray-200 shadow-lg  max-w-4xl mx-auto  ">
        <Image
          src={replaceHttpWithHttps(event.eventHost?.image)}
          alt="Organizer"
          className="w-12 h-12 rounded-full mr-4"
          height={960}
          width={600}
        />
        <div className="flex-grow">
          <h3 className="font-bold">{event.eventHost?.username}</h3>
          <p className="text-sm text-gray-500">{event.eventOrganiser}</p>
        </div>
        <button
          className="bg-gray-300 p-2 rounded-full border border-black mr-2"
          onClick={copyPhoneNumber}
        >
          <BsTelephone />
        </button>
        <button className="bg-gray-300 p-2 rounded-full border border-black">
          <BsChat />
        </button>
        {copied && <p className="text-green-500 ml-2">Copied!</p>}
      </div>
      {/* Event Details Section */}
      <section className="bg-white border border-gray-200 shadow-lg w-full max-w-4xl mx-auto flex flex-col p-6 rounded-lg space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">{event.eventTitle}</h1>
          <h3 className="text-xl font-bold mt-2">{event.eventTopic}</h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {event.orders
              .reverse()
              .slice(0, 3)
              .map((user: any, index: number) => (
                <Image
                  // priority
                  key={index}
                  className={`h-[40px] w-[40px] rounded-full ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                  src={replaceHttpWithHttps(user?.userId?.image)}
                  alt="attendee"
                  height={960}
                  width={600}
                  style={{ zIndex: event.orders.length - index }}
                />
                // <div>{replaceHttpWithHttps(user?.userId?.image)}</div>
              ))}
            <span className="ml-1 text-sm text-black font-bold">
              {formatAttendanceNumber(event.orders.length)} Going
            </span>
          </div>
          <button className="font-bold text-sm text-blue-500">Invite</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm">
              <FiClock />
              <span>
                {convertTimeToCustomFormat(event.eventDate)} {event.eventTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <IoLocationOutline size={16} />
              <span>{event.eventLocation}</span>
            </div>
          </div>
          <div className="flex justify-end items-center">
            {event.eventVerification ? (
              <div className="flex items-center text-green-500">
                <BsCheckCircle className="mr-1" />
                <span>Verified</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <BsExclamationCircle className="mr-1" />
                <span>Not verified</span>
              </div>
            )}
          </div>
        </div>

        {/* <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <Image
            src={replaceHttpWithHttps(event.eventHost?.image)}
            alt="Organizer"
            className="w-12 h-12 rounded-full mr-4"
        
            height={960}
            width={600}
          />
          <div className="flex-grow">
            <h3 className="font-bold">{event.eventHost?.username}</h3>
            <p className="text-sm text-gray-500">{event.eventOrganiser}</p>
          </div>
          <button
            className="bg-gray-300 p-2 rounded-full border border-black mr-2"
            onClick={copyPhoneNumber}
          >
            <BsTelephone />
          </button>
          <button className="bg-gray-300 p-2 rounded-full border border-black">
            <BsChat />
          </button>
          {copied && <p className="text-green-500 ml-2">Copied!</p>}
        </div> */}

        <div>
          <h3 className="text-lg font-bold">Description & Tips</h3>
          <p className="mt-2">{event.eventDescription}</p>
        </div>

        <Accordion
          className="bg-gray-300   shadow-lg px-4"
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="text-lg font-bold">Event Details</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  {/* {event.eventDressCode && (
              <li className="text-sm">Dress Code: {event.eventDressCode}</li>
            )} */}
                  {event.eventEnquiryPhoneNumber && (
                    <li className="text-sm">
                      Enquiry: {event.eventEnquiryPhoneNumber}
                    </li>
                  )}
                  {event.eventWebsite && (
                    <li className="text-sm">
                      Website:{" "}
                      <a href={event.eventWebsite} className="text-blue-500">
                        {event.eventWebsite}
                      </a>
                    </li>
                  )}
                  {event.eventSponsor && (
                    <li className="text-sm">Sponsors: {event.eventSponsor}</li>
                  )}
                  {event.eventEntertainments && (
                    <li className="text-sm">
                      Entertainment: {event.eventEntertainments}
                    </li>
                  )}
                  {event.eventGuestArtist && (
                    <li className="text-sm">
                      Guest Artist: {event.eventGuestArtist}
                    </li>
                  )}
                  {event.eventGenderRequirement && (
                    <li className="text-sm">
                      Gender: {event.eventGenderRequirement}
                    </li>
                  )}
                  {/* {event.eventAgeRequirement && (
              <li className="text-sm">Age: {event.eventAgeRequirement}</li>
            )} */}
                  {event.eventActivities && (
                    <li className="text-sm">
                      Activities: {event.eventActivities}
                    </li>
                  )}
                  {event.eventMaximumAttendanceNeeded && (
                    <li className="text-sm">
                      Slots:{" "}
                      {event.eventMaximumAttendanceNeeded - event.orders.length}
                      /{event.eventMaximumAttendanceNeeded}
                    </li>
                  )}
                  {/* {event.eventMaximumAttendanceNeeded && event.orders.length && (
              <li className="text-sm">
                Available Slots:{" "}
                {event.eventMaximumAttendanceNeeded - event.orders.length}
              </li>
            )} */}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div>
          {/* <h3 className="font-bold">Comments and Reviews Section</h3>
          <small>This section is still being developed</small> */}
          <h3 className="text-lg font-bold mb-2">Comments & Reviews (33)</h3>
          <Drawer>
            <DrawerTrigger>
              {" "}
              <div className="p-4 rounded-lg flex items-center w-full bg-white border  border-gray-200 shadow-lg  max-w-4xl mx-auto  ">
                <Image
                  src={replaceHttpWithHttps(event.eventHost?.image)}
                  alt="Organizer"
                  className="w-16 h-16 rounded-full mr-4"
                  height={960}
                  width={600}
                />
                <div className="flex flex-col flex-grow item-start justify-start w-full">
                  {/* <h3 className="font-bold text-left">
                    {event.eventHost?.username}
                  </h3> */}
                  <p className="text-left text-sm text-gray-500 truncate text-ellipsis max-h-14 whitespace-normal">
                    i am starting to think that this event has a future as the
                    biggest event{" "}
                  </p>
                  <div className="rating mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star ${4 >= star ? "" : "empty"}`}
                        // onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-bold text-xl">
                  Comments and Reviews
                </DrawerTitle>
                <DrawerDescription>
                  Get comments about the event
                </DrawerDescription>
              </DrawerHeader>
              <CommentsSection />
              <DrawerFooter className="flex ">
                {/* <button className="bg-red-400" type="submit">Submit</button> */}
                <DrawerClose className="" asChild>
                  <button className="flex item-center justify-center bg-gray-200 py-2">
                    <IoClose size={45} />
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Ticket Purchase Section */}
      <section className="flex flex-col items-center justify-center space-y-2 pb-4 w-full max-w-4xl mx-auto">
        <div className="text-sm font-bold">
          TICKET PRICES ARE INCLUSIVE OF EventHive FEES
        </div>
        <div className="text-sm">Be part of an event without hesitating</div>
        <Button
          text="Get Ticket"
          color="black rounded-lg"
          onClick={() => router.push(`/party/pay/${event?._id}`)}
        />
      </section>

      {/* Event ID Section */}
      <div className="flex items-center justify-center">
        <p>Event ID: {event?._id}</p>
      </div>

      {/* Recommended Events Section */}
      <section className="flex flex-col  justify-center w-full max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">More Like This</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
          {similarEvents.map((similarEvent: any) => (
            <EventCard key={similarEvent?._id} event={similarEvent} />
          ))}
        </div>
      </section>

      <div>
        <h2 className="text-2xl font-bold mb-4">Similar Upcoming Events</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {similarEvents.map((similarUpcomingEvent: any) => (
            <SimilarUpcomingEventCard
              key={similarUpcomingEvent._id}
              event={similarUpcomingEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
