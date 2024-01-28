"use client";
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";



const getEvent = async (id:any) => {
  
  try {
    const res = await fetch(
      `/api/event/${id.id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("There was an Error fetching");
    }

    

    return res.json()
  } catch (error) {
    console.error('Error fetching the event',error)
  }
};


export default async function Page({params}:{params:{id:string}}) {
  const router = useRouter();
  
// const id = String(params.id)
  const {event} = await getEvent(params)
  console.log(event)
  return (
    <div className="p-2 flex flex-col space-y-8 font-poppins items-center justify-center">
      <section>
        <img
          className="h-[500px] w-full"
          src={event.eventFlyer}
          alt="event-thumbnail"
        />
      </section>
      <section className="bg-white border border-black w-full flex flex-col p-4">
        <div>
          <h1 className="font-extrabold text-2xl">{event.eventTitle}</h1>
          <p className="text-sm">Thursday, 7pm {event.eventDate}</p>
        </div>

        <div>
          <h3 className=" font-bold">Details</h3>
          {event.eventDetails}
          <p>26/10/2023, Thursday, 7:00PM</p>
          <p>Beach Vibes /category/</p>

        </div>

        <div>
          <h3 className=" font-bold">Location</h3>
          {event.eventLocation}
          <p>Abak road, aks uyo</p>
        </div>

        <div>
          <h3 className=" font-bold">Description / About</h3>
          <p>
            {event.eventDescription}
            This event consist of 10000 pakfs jfks that are going to whaegesdfe
            twj fs ots f soaj do lrwlkfsl kls fjls
          </p>
        </div>

        <div>
          <h3 className=" font-bold">Entertainments</h3>
          <p>{event.eventEntertainments}food,drinks,alcohol</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Topic</h3>
          <p>{event.eventTopic}Harnessing the power of AI</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Time</h3>
          <p>{event.eventTime}3:00PM-5:00PM</p>
        </div>

        <div>
          <h3 className=" font-bold">Guest Artist</h3>
          <p>{event.eventGuestArtist}Davido, Wizkid, Olamide</p>
        </div>

        <div>
          <h3 className=" font-bold">Gate Fee</h3>
          <p>{event.eventFee}#10,000</p>
        </div>

        <div>
          <h3 className=" font-bold">Gender Requirement</h3>
          <p>{event.eventGenderRequirement}Male</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Age Requirement</h3>
          <p>{event.eventAgeRequirement}20 years and above</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Timeline</h3>
          <p>{event.eventTimeline}introduction</p>
          <p>Prayers</p>
          <p>congratulations</p>
          <p>closing</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Website</h3>
          <a href="www.naso.com/event">{event.eventWebsite}</a>
        </div>

        <div>
          <h3 className=" font-bold">Event Category</h3>
          <p>{event.eventCategory}Recreational</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Organisers</h3>

          <p>{event.eventOrganiser}GAF</p>
          <p>Sterling bank</p>
          <p>eni stores</p>
        </div>

        <div>
          
          <h3 className=" font-bold">Event Sponsors</h3>
          <p>{event.eventSponsor}Imikan store</p>
          <p>pericle bank</p>
          <p>melli</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Verification</h3>
          <p>verified</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Dressing Code</h3>
          <p>{event.eventDressCode}</p>
        </div>

        <div>
          <h3 className=" font-bold">Event ID</h3>
          <p>2jmmne29en2i4e2i4</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Attendance Count</h3>
          <p>99 people attending</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Maximum Attendance Needed</h3>
          <p>{event.eventMaximumAttendanceNeeded} vacancy, 121 people left</p>
        </div>

        <div>
          <h3 className=" font-bold">Event Enquiry Phone No.</h3>
          <p>{event.eventEnquiryPhoneNumber}</p>
        </div>

        <div>
          <h3 className=" font-bold">Interactive map to find event</h3>
          <p>{event.eventLocationForinteractiveMap}</p>
        </div>

        <div>
          <h3 className=" font-bold">Ticket</h3>
          <p>The Good Beach /location/</p>
          <p>#4,500</p>
        </div>

        <div>
          <h3 className=" font-bold">Party Activities</h3>
          <p>{event.eventActivities}</p>
          <p>activities</p>
        </div>

 
        <div>
          <h3 className=" font-bold">Comments and Reviews Section</h3>
          <p>This is the comment section</p>
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
            router.push("/party/pay/{payId}");
          }}
        />
      </section>
    </div>
  );
}
