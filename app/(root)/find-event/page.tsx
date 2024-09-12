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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event`,
      {
        cache: "no-store",
      }
    );
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
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="bg-white shadow-lg rounded-b-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/find-event" className="flex items-center">
                <span className="text-2xl font-bold text-yellow-500">
                  Event
                </span>
                <span className="text-2xl font-bold text-gray-800">Hive</span>
              </Link>
              <div>
                {session?.user?.image ? (
                  <Link href={"/profile"}>
                    <img
                      className="h-10 w-10 rounded-full border-2 border-yellow-500"
                      src={session?.user?.image as string}
                      alt="profile-photo"
                    />
                  </Link>
                ) : (
                  <Link href={"/login"}>
                    <Image
                      className="h-10 w-10 rounded-full border-2 border-yellow-500"
                      src={Avatar?.src}
                      alt="profile-photo"
                      width={40}
                      height={40}
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="mt-8 mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Current Location
          </h2>
          <UserPosition />
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="event-filters mb-8">
          <div className="flex justify-center space-x-4">
            <Link href={"/find-event"}>
              <button className="px-6 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition duration-300">
                Events
              </button>
            </Link>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:bg-gray-300 transition duration-300">
              Deals
            </button>
          </div>
        </div>

        <section className="mb-12">
          {/* <Carousel query={query} currentPage={currentPage} events={events} /> */}
          <Carousel events={events} />
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Trending Events
            </h2>
            <div className="text-blue-600 hover:text-blue-800 transition duration-300">
              show all
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
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

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Offbeat Events</h2>
            <div className="text-blue-600 hover:text-blue-800 transition duration-300">
              show all
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
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

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Discover Events
            </h2>
            <Link href="/show-all">
              <div className="text-blue-600 hover:text-blue-800 transition duration-300">
                show all
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                  <Image
                    src={event.src}
                    alt={`${event.label}-img`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {event.label}
                    </span>
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
