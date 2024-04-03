
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import Avatar from '@/public/assets/avatar.png'
import { EffectCards } from "swiper/modules";
import Link from "next/link";
import Footer from "@/components/layoutComponents/Footer";
import Image from 'next/image'
import ArtsAndCulture from "@/public/assets/artsandculture.jpg";
import Concerts from "@/public/assets/concerts.jpg";
import MatchMaking from "@/public/assets/matchmaking.jpg";
import Partys from "@/public/assets/partys.jpg";
import Recreational from "@/public/assets/recreational.jpg";
import RestaurantAndLounges from "@/public/assets/restaurantandlounges.jpg";
import BeachVibe from "@/public/assets/beachvibe.jpg";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { EventCardSwiper } from "@/components/layoutComponents/EventCardSwiper";

import { getCurrentUser } from "@/utils/getUserDetails";
import SwiperEffect from "./SwiperEffect";



const getEvents = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event`,
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

// const getUserDetails = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/getuser-details", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("There was an Error getting User details");
//     }

//     return res.json()
//   } catch (error) {
//     console.error('Error getting user details',error)
//   }
// };








  export default async function Page() {
    // const router = useRouter();
    const session = await getServerSession(options);
    console.log("me",session);

    // const session = await getSession()
    const { events } = (await getEvents()) ?? {};
    // const {user} = (await getUserDetails()) ?? {};
const userDetails = await getCurrentUser()
    console.log("mm",userDetails)






    return (
      <div>
      
        <main className="w-full overflow-x-clip">
          <nav className="flex flex-row bg-black p-4 container mx-auto items-center justify-between">
            <Link href="/gg" className="text-white hover:text-yellow-400">
              <div className="text-white text-2xl font-bold">
                <span className="text-yellow-400">Event</span>Hive
              </div>
            </Link>
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
                <Link href={"/login"}>
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
            <section className="relative h-full">
              {/* <Swiper events={events} /> */}
              <SwiperEffect events={events} />
            </section>
          </div>

          <section className="pt-5">
            <div className="flex items-center justify-between p-4 font-bold text-white">
              <p>Discover Events</p>
              <Link href={"/show-all"}>show all</Link>
            </div>
            <div className="discover-cards flex flex-col space-y-2 p-4 bg-black font-bold">
              <Link href={`/discover/parties`}>
                <div className="relative border-2 border-black">
                  <Image
                    src={Partys?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    //  layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    Parties
                  </div>
                </div>
              </Link>
              <Link href={`/discover/artsandculture`}>
                <div className="relative border border-black">
                  <Image
                    src={ArtsAndCulture?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    // layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    Arts and Culture
                  </div>
                </div>
              </Link>
              <Link href={`/discover/beachvibes`}>
                <div className="relative border border-black">
                  <Image
                    src={BeachVibe?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    // layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    Beach Vibes
                  </div>
                </div>
              </Link>
              <Link href={`/discover/restaurantandlounges`}>
                <div className="relative border border-black">
                  <Image
                    src={RestaurantAndLounges?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    //  layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    Restaurant and Lounges
                  </div>
                </div>
              </Link>
              <Link href={`/discover/recreational`}>
                <div className="relative border border-black">
                  <Image
                    src={Recreational?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    // layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    Recreational
                  </div>
                </div>
              </Link>
              <Link href={`/discover/concerts`}>
                <div className="relative border border-black">
                  <Image
                    src={Concerts?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    // layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    Concerts
                  </div>
                </div>
              </Link>
              <Link href={`/discover/matchmaking`}>
                <div className="relative border border-black">
                  <Image
                    src={MatchMaking?.src}
                    alt="banner-img"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                    // layout="responsive"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                    MatchMaking
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
