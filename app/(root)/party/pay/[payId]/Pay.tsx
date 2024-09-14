"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import { useSession } from "next-auth/react";
import {
  convertToTime,
  formatAmount,
  getCurrentDateTime,
  nairaToKobo,
} from "@/utils/helpingFunctions/functions";

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
  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: {
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
        },
      }),
    });

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
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: { eventId, userId, numTickets, totalPrice },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create and save order");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

const getEvent = async (id: any) => {
  try {
    const res = await fetch(`/api/event/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("There was an error fetching");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching the event", error);
  }
};

export default function Pay({
  params,
  user,
  paystack_key,
}: {
  params: any;
  user: any;
  paystack_key: string;
}) {
  const [event, setEvent] = useState<any>();
  const router = useRouter();
  const { data: session, status } = useSession();
  const eventDefaultData = {
    name: "",
    email: "",
    phone: "",
    ticketType: "",
    amount: nairaToKobo(event?.eventFee),
  };
  
    const [formData, setFormData] = useState(eventDefaultData);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const { event } = await getEvent(params);
      setEvent(event);
    };
    fetchEventDetails();
  }, [params]);

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
    setFormData(eventDefaultData);
  };

  const componentProps = {
    email: formData.email,
    amount: eventDefaultData.amount,
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
    publicKey: paystack_key,
    text: "Pay Now",
    onSuccess: ({ reference }: any) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );

      if (reference) {
        createEventTicketOrder({
          eventId: event._id,
          userId: user._id,
          numTickets: 1,
          totalPrice: event?.eventFee * 1,
        }).then((res) => {
          sendEmailToServer({
            to: status === "authenticated" && session?.user?.email,
            name: user?.username,
            subject: "EventHive",
            body: "",
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
              resetForm();
            })
            .catch((error) => {
              console.error("Error sending email:", error);
            });
        });
      }
    },
    onClose: () => {
      return;
    },
  };

  return (
    // <main className="flex flex-col items-center justify-evenly w-full gap-8 p-10">
    //   <header className="text-center">
    //     <h1 className="text-4xl font-extrabold">Get Tickets</h1>
    //   </header>
    //   <section className="w-full flex flex-col items-center text-wrap break-words">
    //     <article className="flex flex-col w-full items-center text-wrap">
    //       <h2 className="text-2xl font-extrabold my-4">{event?.eventTitle}</h2>
    //       <div className="flex flex-col w-full items-start">
    //         <p className="bold">
    //           <strong>Ticket</strong>
    //         </p>
    //         <div className="flex items-center justify-start gap-4">
    //           <div>
    //             <p>
    //               <small>Entry Fee</small>
    //             </p>
    //             <p className="font-bold">{formatAmount(event?.eventFee)}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </article>
    //   </section>
    //   <form className="flex flex-col w-full gap-4">
    //     <div className="flex flex-col items-start">
    //       <label htmlFor="name" className="font-bold">
    //         Name
    //       </label>
    //       <input
    //         className="w-full h-10 text-lg border border-gray-300 rounded p-2"
    //         type="text"
    //         id="name"
    //         name="name"
    //         required
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="flex flex-col items-start">
    //       <label htmlFor="phone" className="font-bold">
    //         Phone
    //       </label>
    //       <input
    //         className="w-full h-10 text-lg border border-gray-300 rounded p-2"
    //         type="text"
    //         id="phone"
    //         name="phone"
    //         required
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="flex flex-col items-start">
    //       <label htmlFor="email" className="font-bold">
    //         Email
    //       </label>
    //       <input
    //         className="w-full h-10 text-lg border border-gray-300 rounded p-2"
    //         type="email"
    //         id="email"
    //         name="email"
    //         required
    //         onChange={handleChange}
    //       />
    //       <p className="text-sm text-gray-600">
    //         We will email your ticket to this address
    //       </p>
    //     </div>
    //     <div className="flex flex-col items-start">
    //       <label htmlFor="ticketType" className="font-bold">
    //         Ticket Type
    //       </label>
    //       <select
    //         className="w-full h-10 text-lg border border-gray-300 rounded p-2"
    //         id="ticketType"
    //         name="ticketType"
    //         onChange={handleChange}
    //       >
    //         <option value="entry">Entry</option>
    //         <option value="couples">Couples</option>
    //       </select>
    //     </div>
    //   </form>
    //   <div className="w-full flex flex-col items-center text-center">
    //     <p className="font-bold">Buy Multiple Tickets</p>
    //     <p className="text-sm text-gray-600">
    //       We will email their tickets to the addresses you provide below
    //     </p>
    //   </div>
    //   <PaystackButton
    //     className="bg-black text-white font-bold py-2 px-6 rounded-full"
    //     {...componentProps}
    //   />
    // </main>
    <main className="flex flex-col items-center justify-evenly w-full gap-8 p-10 bg-yellow-50 min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold text-yellow-800">Get Tickets</h1>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8"
      >
        <article className="flex flex-col w-full items-center text-wrap">
          <h2 className="text-2xl font-extrabold my-4 text-yellow-700">
            {event?.eventTitle}
          </h2>
          <div className="flex flex-col w-full items-start bg-yellow-100 p-4 rounded-lg">
            <p className="font-bold text-yellow-800 mb-2">Ticket Details</p>
            <div className="flex items-center justify-start gap-4">
              <div>
                <p className="text-sm text-yellow-600">Entry Fee</p>
                <p className="font-bold text-2xl text-yellow-800">
                  {formatAmount(event?.eventFee)}
                </p>
              </div>
            </div>
          </div>
        </article>

        <form className="flex flex-col w-full gap-6 mt-8">
          <div className="flex flex-col items-start">
            <label htmlFor="name" className="font-bold text-yellow-800 mb-1">
              Name
            </label>
            <input
              className="w-full h-12 text-lg border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:border-yellow-500 transition duration-300"
              type="text"
              id="name"
              name="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="phone" className="font-bold text-yellow-800 mb-1">
              Phone
            </label>
            <input
              className="w-full h-12 text-lg border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:border-yellow-500 transition duration-300"
              type="text"
              id="phone"
              name="phone"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="email" className="font-bold text-yellow-800 mb-1">
              Email
            </label>
            <input
              className="w-full h-12 text-lg border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:border-yellow-500 transition duration-300"
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
            <p className="text-sm text-yellow-600 mt-1">
              We will email your ticket to this address
            </p>
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="ticketType"
              className="font-bold text-yellow-800 mb-1"
            >
              Ticket Type
            </label>
            <select
              className="w-full h-12 text-lg border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:border-yellow-500 transition duration-300"
              id="ticketType"
              name="ticketType"
              onChange={handleChange}
            >
              <option value="entry">Entry</option>
              <option value="couples">Couples</option>
            </select>
          </div>
        </form>

        <div className="w-full flex flex-col items-center text-center mt-8">
          <p className="font-bold text-yellow-800">Buy Multiple Tickets</p>
          <p className="text-sm text-yellow-600">
            We will email their tickets to the addresses you provide below
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <PaystackButton
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md"
            {...componentProps}
          />
        </motion.div>
      </motion.section>
    </main>
  );
}
