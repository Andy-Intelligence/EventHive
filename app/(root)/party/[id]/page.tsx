"use client";
import Button from "@/components/layoutComponents/Button";
import {
  formatAmount,
  formatDateTime,
} from "@/utils/helpingFunctions/functions";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getEvent = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/event/${id.id}`, {
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

export default  function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<any>();
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event details
        const { event } = await getEvent(params);
        setEvent(event);

        // Fetch users attending the event
        const users = await fetchUsersAttendingEvent(event._id);
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

  console.log(users);
  return (
    <div className="p-2 flex flex-col space-y-8 font-poppins items-center justify-center">
      <section>
        {/* <img
          className="h-[500px] w-full"
          src={event.eventFlyer}
          alt="event-thumbnail"
        /> */}
        <CldImage
          key={event?._id}
          src={event?.eventFlyer?.secure_url}
          alt="event-thumbnail"
          height={960}
          width={600}
          className="cover"
        />
      </section>
      <section className="bg-white border border-black w-full flex flex-col p-4 text-wrap break-all break-words whitespace-normal">
        <div>
          <h1 className="font-extrabold text-2xl">{event?.eventTitle}</h1>
          <p className="text-sm">{formatDateTime(event?.eventDate)}</p>
        </div>

        <div>
          <h3 className=" font-bold">Details</h3>

          <p>{event?.eventDetails}</p>
        </div>

        <div>
          <h3 className=" font-bold">Location</h3>

          <p>{event?.eventLocation}</p>
        </div>

        <div>
          <h3 className=" font-bold">Description / About</h3>
          <p>{event?.eventDescription}</p>
        </div>

        <div>
          <h3 className=" font-bold">Entertainments</h3>
          <p>{event?.eventEntertainments}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Topic</h3>
          <p>{event?.eventTopic}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Time</h3>
          <p>{event?.eventTime}</p>
        </div>

        <div>
          <h3 className=" font-bold">Guest Artist</h3>
          <p>{event?.eventGuestArtist}</p>
        </div>

        <div>
          <h3 className=" font-bold">Gate Fee</h3>
          <p>{formatAmount(event?.eventFee)}</p>
        </div>

        <div>
          <h3 className=" font-bold">Gender Requirement</h3>
          <p>{event?.eventGenderRequirement}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Age Requirement</h3>
          <p>{event?.eventAgeRequirement}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Timeline</h3>
          <p>{event?.eventTimeline}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Website</h3>
          <a href={event?.eventWebsite}>{event?.eventWebsite}</a>
        </div>

        <div>
          <h3 className=" font-bold">Event Category</h3>
          <p>{event?.eventCategory}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Organisers</h3>

          <p>{event?.eventOrganiser}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Sponsors</h3>
          <p>{event?.eventSponsor}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Verification</h3>
          <p>Not verified</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Dressing Code</h3>
          <p>{event?.eventDressCode}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event ID</h3>
          <p>{event?._id}</p>
        </div>

        <div>
          <h3 className="font-bold">Event Attendance Count</h3>
          <p>
            {users?.users?.length === 1
              ? "One person attending"
              : `${users?.users?.length} people attending`}
          </p>
        </div>

        <div>
          <h3 className=" font-bold">Event Maximum Attendance Needed</h3>
          <p>
            {event?.eventMaximumAttendanceNeeded} vacancy,{" "}
            {event?.eventMaximumAttendanceNeeded - users?.users?.length} people
            left
          </p>
        </div>

        <div>
          <h3 className=" font-bold">Event Enquiry Phone No.</h3>
          <p>{event?.eventEnquiryPhoneNumber}</p>
        </div>

        <div>
          <h3 className=" font-bold">Interactive map to find event</h3>
          <p>{event?.eventLocationForinteractiveMap}</p>
        </div>
        <div>
          <h3 className=" font-bold">Event Latitude</h3>
          <p>{event?.eventLatitude}</p>
        </div>
        <div>
          <h3 className=" font-bold">Event Longitude</h3>
          <p>{event?.eventLongitude}</p>
        </div>

        <div>
          <h3 className=" font-bold">Party Activities</h3>
          <p>{event?.eventActivities}</p>
        </div>

        <div>
          <h3 className=" font-bold">Comments and Reviews Section</h3>
          <small>This is the comment section still being developed</small>
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
    </div>
  );
}
