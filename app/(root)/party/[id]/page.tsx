"use client";
import { MapComponent } from "@/components/externalApiViews/Map";
import Button from "@/components/layoutComponents/Button";
import CategoryButton from "@/components/layoutComponents/CategoryButton";
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
import { GoogleMap } from "@react-google-maps/api";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BsChat,
  BsCheckCircle,
  BsExclamationCircle,
  BsTelephone,
} from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoLocationOutline, IoLocationSharp } from "react-icons/io5";

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
    console.error("Error fetching the Attendance Cunt", error);
  }
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        console.log(params);
        const { event } = await getEvent(params?.id);
        setEvent(event);
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

  // const id = String(params.id)
  const copyPhoneNumber = () => {
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
  };
  return (
    <div className="p-2 flex flex-col space-y-8 font-poppins items-center justify-center">
      <section className="relative">
        {event && event.eventFlyer && event.eventFlyer.secure_url && (
          <CldImage
            key={event._id}
            src={event.eventFlyer.secure_url}
            alt="event-thumbnail"
            height={960}
            width={600}
            className="cover  rounded-lg"
          />
        )}
        {/* <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
          MatchMaking
        </div> */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-4 py-1 flex flex-col items-center justify-center rounded-lg ">
          <div className="text-xl font-bold  text-white">
            {getDayFromDate(event?.eventDate)}
          </div>{" "}
          <div>{convertToMonth(event?.eventDate)}</div>
        </div>
      </section>

      <section className="flex  justify-between items-start gap-3 w-full">
        <div className="flex items-center justify-center  gap-2">
          <div className="flex items-center justify-center">
            <CategoryButton
              text={event?.eventCategory}
              category={event?.eventCategory}
            />
          </div>
          <div className="flex items-center justify-center">
            <CategoryButton text={"5.0"} category={"StarRating"} />
          </div>
        </div>
        <div className="flex items-center justify-end text-xl w-full">
          <p className="flex items-center justify-center font-bold text-black">
            {formatNumberToNaira(event?.eventFee)}{" "}
            <span className="font-normal text-gray text-sm">/Person</span>
          </p>
        </div>
      </section>
      <section className="bg-white border border-black w-full flex flex-col p-4 text-wrap break-all break-words whitespace-normal gap-4">
        <div className="my-2">
          <h1 className="font-extrabold text-2xl my-2">{event?.eventTitle}</h1>
          <div className="">
            <h3 className="text-xl font-bold mb-2">{event?.eventTopic}</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-between">
          <div>
            <div className="w-full flex items-center justify-start gap-2">
              <div>
                <FiClock />
              </div>
              <div>
                {convertTimeToCustomFormat(event?.eventDate)} {event?.eventTime}
              </div>
            </div>

            <div className="flex items-center justify-start gap-2 w-full text-black">
              <div className="flex items-center justify-center">
                <IoLocationOutline size={16} />
              </div>
              <div className="flex items-center justify-center">
                {event?.eventLocation}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="mb-6">
              {event?.eventVerification ? (
                <div className="flex items-center text-green-500">
                  <BsCheckCircle className="mr-1" />
                  <p>Verified</p>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <BsExclamationCircle className="mr-1" />
                  <p>Not verified</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between my-4">
          <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center ">
              {event?.orders
                .reverse()
                .slice(0, 3)
                .map((user: any, index: number) => {
                  return (
                    <img
                      key={index}
                      className={`h-[40px] w-[40px] rounded-full ${
                        index !== 0 ? "-ml-2" : ""
                      }`}
                      src={replaceHttpWithHttps(user?.userId?.image)}
                      alt="pics"
                      style={{ zIndex: event?.orders?.length - index }} // Adjust the zIndex dynamically
                    />
                  );
                })}
            </div>

            <span className="ml-1 flex items-center justify-center text-[13px] text-black  font-bold break-all whitespace-normal">
              {" "}
              {formatAttendanceNumber(event?.orders?.length)} Going
            </span>
          </div>
          <div>
            <p className="font-bold text-sm">Invite</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Organizer</h3>
          <div className="flex items-center my-2 bg-gray-200 rounded-lg p-2">
            <div className="flex-shrink-0 mr-4">
              <img
                src={event?.eventHost?.image}
                alt="Profile Picture"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h3 className="font-bold mb-1">{event?.eventHost?.username}</h3>
              <p className="text-sm text-gray-500">{event?.eventOrganiser}</p>
            </div>
            <div className="ml-auto flex">
              <button
                className="mr-2 bg-gray-300 rounded-full p-2 border border-black"
                onClick={copyPhoneNumber}
              >
                <BsTelephone />
              </button>
              <button className="bg-gray-300 rounded-full p-2 border border-black">
                <BsChat />
              </button>
            </div>
          </div>
          {copied && <p className="text-green-500">Copied!</p>}
        </div>
        <div className="mb-6">
          <h3 className=" text-lg font-bold mb-2">Description & Tips</h3>
          <p className="whitespace-normal">{event?.eventDescription}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Event Timeline</h3>
            <p>{event?.eventTimeline}</p>
          </div> */}

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">
              Interactive map to find event
            </h3>
            <div>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "50vh",
                  borderRadius: "15px 15px 15px 15px",
                }}
                center={{
                  lat: event?.eventLatitude,
                  lng: event?.eventLongitude,
                }}
                zoom={18}
                options={{
                  zoomControl: true,
                  tilt: 0,
                  gestureHandling: "auto",
                  mapTypeId: "hybrid",
                }}
              ></GoogleMap>
            </div>
            {/* <p>{event?.eventLocationForinteractiveMap}</p> */}
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-2"> Latitude</h3>
                <p>{event?.eventLatitude}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2"> Longitude</h3>
                <p>{event?.eventLongitude}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">Event Details</h2>
          <ul className="list-disc pl-5">
            <li className="text-sm">Dress Code: {event?.eventDressCode}</li>
            <li className="text-sm">
              Enquiry: {event?.eventEnquiryPhoneNumber}
            </li>
            <li className="text-sm">
              Website:{" "}
              <a href={event?.eventWebsite} className="text-blue-500">
                {event?.eventWebsite}
              </a>
            </li>
            <li className="text-sm">Sponsors: {event?.eventSponsor}</li>
            <li className="text-sm">
              Entertainment: {event?.eventEntertainments}
            </li>
            <li className="text-sm">Guest Artist: {event?.eventGuestArtist}</li>
            <li className="text-sm">Gender:{event?.eventGenderRequirement}</li>
            <li className="text-sm">Age: {event?.eventAgeRequirement}</li>
            <li className="text-sm">Activities: {event?.eventActivities}</li>
            <li className="text-sm">
              Slots: {event?.eventMaximumAttendanceNeeded}
            </li>
            <li className="text-sm">
              Available Slots:{" "}
              {event?.eventMaximumAttendanceNeeded - event?.orders?.length}{" "}
            </li>
            {/* Add more details as needed */}
          </ul>
        </div>

        <div>
          <h3 className=" font-bold">Comments and Reviews Section</h3>
          <small>This section is still being developed</small>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 my-4">
          <Button
            text={"Share"}
            color={"black"}
            onClick={() => {
              router.push("/share");
            }}
          />
          <Button
            text={"Share"}
            color={"black"}
            onClick={() => {
              router.push("/share");
            }}
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center space-y-2 pb-4">
        <div className="text-sm font-bold">
          TICKET PRICES ARE INCLUSIVE OF EventHive FEES
        </div>
        <div className="text-sm">be part of an event without hesitating</div>
        <Button
          text={"Get Ticket"}
          color={"black rounded-[10px]"}
          onClick={() => {
            router.push(`/party/pay/${event?._id}`);
          }}
        />
      </section>
      <div className="flex items-center justify-center">
        {/* <h3 className="text-sm font-bold mb-2"></h3> */}
        <p>Event ID: {event?._id}</p>
      </div>
    </div>
  );
}
