"use client";
// import Button from "@/components/layoutComponents/Button";
import {
  convertToTime,
  formatAmount,
  getCurrentDateTime,
  nairaToKobo,
} from "@/utils/helpingFunctions/functions";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/utils/getUserDetails";

async function sendEmailToServer({
  to,
  name,
  subject,
  body,
  eventFlyer,
  confirmationNumber,
  date,
  timeStart,
  timeEnd,
  noOfTickets,
  mobileNumber,
  ticketType,
  location,
  price,
  orderDate,
  userId,
  orderId,
}: any) {
  // const userDetails = await getCurrentUser();
  // console.log("mm", userDetails);

  try {
    const response = await fetch(
      `https://event-hive-liart.vercel.app/api/sendMail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            to: to,
            name: name,
            subject: subject,
            body: body,
            eventFlyer,
            confirmationNumber,
            date,
            timeStart,
            timeEnd,
            noOfTickets,
            mobileNumber,
            ticketType,
            location,
            price,
            orderDate,
            userId,
            orderId,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createEventTicketOrder({
  eventId,
  userId,
  numTickets,
  totalPrice,
}: any) {
  try {
    const response = await fetch(
      `https://event-hive-liart.vercel.app/api/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: { eventId, userId, numTickets, totalPrice },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create and save order");
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error:", error);
  }
}

const getEvent = async (id: any) => {
  try {
    const res = await fetch(
      `https://event-hive-liart.vercel.app/api/event/${id}`,
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

// const sending = async () => {
//   await sendMail({
//     to: "andidiongu@gmail.com",
//     name: "andy",
//     subject: "test mail",
//     body: `<h1>Hello world!</h1>`,
//   });
// };

export default function Pay({ params, user,paystack_key }: { params: any; user: any; paystack_key:string }) {
  const [event, setEvent] = useState<any>();
  useEffect(() => {
    const fetchEventDetails = async () => {
      const { event } = await getEvent(params);
      // console.log(event)

      setEvent(event);
    };
    fetchEventDetails();
  }, []);
  const router = useRouter();
  const eventDefaultData = {
    name: "",
    email: "",
    phone: "",
    ticketType: "",
    amount: nairaToKobo(event?.eventFee),
  };

  const [formData, setFormData] = useState(eventDefaultData);
  const { data: session, status } = useSession();

  // if (status === "authenticated") {
  //   return <p>Signed in as {session?.user?.email}</p>;
  // }


  console.log(paystack_key)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetForm = () => {
    //  setEmail("");
    //  setName("");
    //  setPhone("");
  };
  const componentProps = {
    email: formData.email,
    amount: eventDefaultData.amount,
    //  amount: formData.ticketType === "entry" ? 16500 : 28500,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: formData.name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData.phone,
        },
      ],
    },
    publicKey:paystack_key
      

    ,
    text: "Pay Now",
    onSuccess: ({ reference }: any) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );

      if(reference){
createEventTicketOrder({
  eventId: event._id,
  userId: user._id,
  numTickets: 1,
  totalPrice: event?.eventFee * 1,
}).then((res) => {
  // Perform asynchronous operation without async/await

  sendEmailToServer({
    to: status === "authenticated" && session?.user?.email,
    name: user?.username,
    subject: "EventHive",
    body: ``,
    eventFlyer: event?.eventFlyer?.secure_url,
    confirmationNumber: reference,
    date: event?.eventDate,
    timeStart: convertToTime(event?.eventDate),
    timeEnd: "",
    noOfTickets: 1,
    mobileNumber: formData?.phone,
    ticketType: formData?.ticketType,
    location: event?.eventLocation,
    price: event?.eventFee,
    orderDate: getCurrentDateTime(),
    userId: user?._id,
    orderId: res?.order?._id,
  })
    .then(() => {
      // Reset form after email is sent
      resetForm();
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      // Handle error appropriately, e.g., show error message to the user
    });
});

      }

      
      
    },
    // onClose: () => alert("Wait! Don't leave :("),
    onClose: () => {return},
  };

  return (
    <main className="flex flex-col items-center justify-evenly w-full gap-4  p-10">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-center">Get Tickets</h1>
      </header>
      <section className="w-full h-full flex items-center flex-col text-wrap break-all break-words whitespace-normal">
        <article className="flex flex-col w-full items-center text-wrap break-words whitespace-normal">
          <h2 className="text-2xl font-extrabold my-4 text-wrap break-words whitespace-normal">
            {event?.eventTitle}
          </h2>
          <div className="flex flex-col w-full items-start">
            <p className="bold">
              <strong>Ticket</strong>
            </p>
            <div className="flex items-center justify-start gap-2">
              <div>
                <p>
                  <small>Entry Fee</small>
                </p>
                <p className="font-bold">{formatAmount(event?.eventFee)}</p>
              </div>
              <div>
                {/* <p>
                  <small>Couples</small>
                </p>
                <p className="font-bold">N28,500</p> */}
              </div>
            </div>
          </div>
        </article>
      </section>
      <form className="flex flex-col w-full gap-4" action={"post"}>
        <div className="flex flex-col items-start justify-start">
          <label htmlFor="name">Name</label>
          <input
            className="w-full h-[2.5rem] text-lg"
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <label htmlFor="name">Phone</label>
          <input
            className="w-full h-[2.5rem] text-lg"
            type="text"
            id="phone"
            name="phone"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <label htmlFor="email">Email</label>
          <input
            className="w-full h-[2.5rem] text-lg"
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
          <p>We will email your ticket to this address</p>
        </div>
        <div className="flex flex-col items-start justify-start">
          <label htmlFor="ticketType">Ticket Type</label>
          <select
            className="w-full h-[2.5rem] text-lg"
            id="ticketType"
            name="ticketType"
            onChange={handleChange}
          >
            <option selected className=" h-[2.5rem] text-lg" value="entry">
              Entry
            </option>
            <option className=" h-[2.5rem] text-lg" value="couples">
              Couples
            </option>
          </select>
          {/* <p>We will email your ticket to this address</p> */}
        </div>
      </form>
      <div className="w-full flex items-center flex-col justify-center text-center">
        <p>
          <strong>Buy Multiple Tickets</strong>
        </p>
        <p>
          <small>
            We will email their tickets to the addresses you provide below
          </small>
        </p>
      </div>
      <div>
        <p>{/* <b>Add Promo Code</b> */}</p>
      </div>
      {/* <Button color="black" text="Pay {Amount}" /> */}
      <PaystackButton
        className="bg-black font-bold text-white  p-4 rounded-[20px]"
        {...componentProps}
      />

      {/* <script src="https://js.paystack.co/v1/inline.js"></script> */}
    </main>
  );
}
