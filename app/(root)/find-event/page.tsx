

import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import Avatar from "@/public/assets/avatar.png";
import Link from "next/link";
import Footer from "@/components/layoutComponents/Footer";
import Image from "next/image";
import ArtsAndCulture from "@/public/assets/artsandculture.jpg";
import Concerts from "@/public/assets/concerts.jpg";
import MatchMaking from "@/public/assets/matchmaking.jpg";
import Partys from "@/public/assets/partys.jpg";
import Recreational from "@/public/assets/recreational.jpg";
import RestaurantAndLounges from "@/public/assets/restaurantandlounges.jpg";
import BeachVibe from "@/public/assets/beachvibe.jpg";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { EventCardSwiper } from "@/components/layoutComponents/EventCardSwiper";
import { getCurrentUser } from "@/utils/getUserDetails";
import SwiperEffect from "./SwiperEffect";
import SearchBar from "@/components/layoutComponents/SearchBar";
import UserPosition from "@/components/layoutComponents/UserPosition";
import TrendingEvent from "@/components/cards/TrendingEvent";
import { formatTrendingEventDate } from "@/utils/helpingFunctions/functions";
import OffbeatEvent from "@/components/cards/OffbeatEvent";
import SwipeIndicator from "@/components/SwipeIndicator";
import Carousel from "@/components/Carousel";
import Marquee from "../../../components/Marquee";
import AdSense from "@/components/AdSense";

// Utility functions for fetching events
const getEvents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("There was an error fetching the events");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching the events", error);
  }
};

const searchEvents = async (searchQuery: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search/${searchQuery}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to search events");
    }

    const searchData = res.json();
    return searchData;
  } catch (error) {
    console.error(error);
  }
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const session = await getServerSession(options);

  let events = [];
  try {
    events =
      (await searchEvents(query))?.events ?? (await getEvents())?.events ?? [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  const userDetails = await getCurrentUser();

  return (
    <div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4386496689063821"
        crossOrigin="anonymous"
      ></script>
      <main className="w-full overflow-x-clip">
        <nav className="flex flex-row bg-black p-4 container mx-auto items-center justify-between">
          <Link href="/gg">
            <div className="text-white text-2xl font-bold hover:text-yellow-400">
              <span className="text-yellow-400">Event</span>Hive
            </div>
          </Link>
          <div>
            {session?.user?.image ? (
              <Link href={"/profile"}>
                <img
                  className="rounded-full"
                  src={session?.user?.image as string}
                  alt="profile-photo"
                  height={40}
                  width={40}
                />
              </Link>
            ) : (
              <Link href={"/login"}>
                <Image
                  className="rounded-full"
                  src={Avatar?.src}
                  alt="profile-photo"
                  height={40}
                  width={40}
                />
              </Link>
            )}
          </div>
        </nav>
        <div className="w-full flex flex-col items-center justify-center p-1">
          <div className="text-gray-800 text-lg">Current Location</div>
          <div>
            <UserPosition />
          </div>
        </div>
        <SearchBar />
        <div className="event-filters">
          <section className="">
            <div className="flex items-center justify-between p-4">
              <Link href={"/find-event"}>
                <button className="px-4 py-2 mr-4 bg-black text-white rounded-lg focus:outline-none hover:bg-gray-800">
                  Events
                </button>
              </Link>
              {/* <SwipeIndicator /> */}
              <Link href={"/deals"}>
                <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg focus:outline-none hover:bg-yellow-500">
                  Deals
                </button>
              </Link>
            </div>
            <div className="px-4">
              <Marquee />
            </div>
          </section>
        </div>
        {/* <section className="relative h-full">
          <SwiperEffect
            query={query}
            currentPage={currentPage}
            events={events}
          />
        </section> */}
        <section className=" h-full">
          <Carousel query={query} currentPage={currentPage} events={events} />
        </section>
        <section className=" w-full">
          <AdSense
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="5778412345"
          />
        </section>
        <section className="w-full flex flex-col items-center justify-center my-4 ">
          <div className="flex w-full items-center justify-between p-4 font-bold text-black">
            <p>Trending Events</p>
            <Link href={"/show-all"}>
              <div className="text-blue-500 hover:text-blue-700">show all</div>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {events
              .reverse()
              .slice(0, 2)
              .map((event: any, index: number) => (
                <Link key={index + 1} href={`/party/${event?._id}`}>
                  <TrendingEvent
                    key={index}
                    img={event.eventFlyer.secure_url}
                    eventTitle={event.eventTitle}
                    eventDate={formatTrendingEventDate(event.eventDate)}
                    eventLocation={event.eventLocation}
                  />
                </Link>
              ))}
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center my-4 ">
          <div className="flex w-full items-center justify-between p-4 font-bold text-black">
            <p>Offbeat Events</p>
            <Link href={"/show-all"}>
              <div className="text-blue-500 hover:text-blue-700">show all</div>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {events
              .reverse()
              .slice(0, 2)
              .map((event: any, index: number) => (
                <Link key={index + 1} href={`/party/${event?._id}`}>
                  <OffbeatEvent
                    key={index}
                    img={event.eventFlyer.secure_url}
                    eventTitle={event.eventTitle}
                    eventDate={formatTrendingEventDate(event.eventDate)}
                    eventLocation={event.eventLocation}
                    eventDescription={event.eventDescription}
                  />
                </Link>
              ))}
          </div>
        </section>
        <section className="pt-5">
          <div className="flex items-center justify-between p-4 font-bold text-black">
            <p>Discover Events</p>
            <Link href="/show-all">
              <div className="text-blue-500 hover:text-blue-700">show all</div>
            </Link>
          </div>
          <div className="discover-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white font-normal">
            {[
              { href: "/discover/parties", src: Partys?.src, label: "Parties" },
              {
                href: "/discover/artsandculture",
                src: ArtsAndCulture?.src,
                label: "Arts and Culture",
              },
              {
                href: "/discover/beachvibes",
                src: BeachVibe?.src,
                label: "Beach Vibes",
              },
              {
                href: "/discover/restaurantandlounges",
                src: RestaurantAndLounges?.src,
                label: "Restaurant and Lounges",
              },
              {
                href: "/discover/recreational",
                src: Recreational?.src,
                label: "Recreational",
              },
              {
                href: "/discover/concerts",
                src: Concerts?.src,
                label: "Concerts",
              },
              {
                href: "/discover/matchmaking",
                src: MatchMaking?.src,
                label: "MatchMaking",
              },
            ].map((event, index) => (
              <Link key={index} href={event.href}>
                <div className="relative   shadow-[rgba(34,34,34,0.1)] border-black overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                  <Image
                    src={event.src}
                    alt={`${event.label}-img`}
                    width={100}
                    height={100}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm rounded-lg">
                    {event.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
