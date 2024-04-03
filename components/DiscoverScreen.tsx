import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import Avatar from "@/public/assets/avatar.png";

import { EffectCards } from "swiper/modules";
import Link from "next/link";
import Footer from "@/components/layoutComponents/Footer";

import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { EventCardSwiper } from "@/components/layoutComponents/EventCardSwiper";
import Image from "next/image";
import SwiperEffect from "@/app/(root)/find-event/SwiperEffect";

interface EventCategoryProp {
  category: string;
}

const getEventCategory = async (category: any) => {
  console.log(category);
  try {
    const res = await fetch(
      `https://event-hive-liart.vercel.app/api/event-category/${category}`,
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
// const getSession = async () => {

//   return session
// };

export default async function Page({ category }: EventCategoryProp) {
  // const router = useRouter();
  const session = await getServerSession(options);

  // const session = await getSession()
  const { events } = (await getEventCategory(category)) ?? {};
  console.log("h",events);

  return (
    <div className="h-screen flex flex-col justify-between">
      <main className="h-full w-full overflow-x-clip ">
        <nav className="flex flex-row bg-black p-4 container mx-auto items-center justify-between">
          <div className="text-white text-2xl font-bold">
            <span className="text-yellow-400">Event</span>Hive
          </div>
          <div>
            {session?.user?.image ? (
              <Link href={"/profile"}>
                <img
                  className="rounded-[50%]"
                  src={session?.user?.image as string}
                  alt="profile-photo"
                  height={50}
                  width={50}
                />
              </Link>
            ) : (
              <Link href={"/profile"}>
                <Image
                  className="rounded-[50%]"
                  src={Avatar?.src}
                  alt="profile-photo"
                  height={50}
                  width={50}
                />
              </Link>
            )}
          </div>
        </nav>

        <div className="event-filters">
          <section>
            <div className="flex items-center justify-between p-4">
              <Link href={"/find-event"}>
                <Button text={"Events"} color={"black"} />
              </Link>
              <Link href={"/deals"}>
                <Button text={"Deals"} color={"yellow-400 text-black"} />
              </Link>
            </div>
          </section>
        </div>
        <div className="">
          <section>
            <div className="">
              <SwiperEffect events={events} />
            </div>
          </section>
        </div>
      </main>
      <div>

      <Footer />
      </div>
    </div>
  );
}
