"use client";
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-evenly w-full gap-4  p-10">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-center">Get Tickets</h1>
      </header>
      <section className="w-full h-full flex items-center flex-col">
        <article className="flex flex-col w-full items-center">
          <h2 className="text-xl font-bold">
            The Jewelry Workshop (Bead Making)
          </h2>
          <div className="flex flex-col w-full items-start">
            <p className="bold">
              <strong>Ticket</strong>
            </p>
            <div className="flex items-center justify-start gap-2">
              <div>
                <p>
                  <small>Entry</small>
                </p>
                <p className="font-bold">N16,500</p>
              </div>
              <div>
                <p>
                  <small>Couples</small>
                </p>
                <p className="font-bold">N28,500</p>
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
          />
          <p>We will email your ticket to this address</p>
        </div>
        <div className="flex flex-col items-start justify-start">
          <label htmlFor="ticketType">Ticket Type</label>
          <select
            className="w-full h-[2.5rem] text-lg"
            id="ticketType"
            name="ticketType"
          >
            <option className=" h-[2.5rem] text-lg" value="entry">
              Entry
            </option>
            <option className=" h-[2.5rem] text-lg" value="couples">
              Couples
            </option>
          </select>
          <p>We will email your ticket to this address</p>
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
        <p>
          <b>Add Promo Code</b>
        </p>
      </div>
      <Button color="black" text="Pay {Amount}" />
    </main>
  );
}
