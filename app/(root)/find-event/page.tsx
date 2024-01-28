"use client";
import Button from "@/components/layoutComponents/Button";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";


import { EffectCards } from "swiper/modules";
import Link from "next/link";
import Footer from "@/components/layoutComponents/Footer";

const getEvents = async () => {
  try {
    const res = await fetch("https://event-hive-opal.vercel.app//api/event", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("There was an Error fetching");
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching the event',error)
  }
};

export default async function Page() {
  const router = useRouter();

  const gotoEventProfile = (e: any, id: any) => {
    router.push(`/party/${id}`);
  };

  const {events} =  await getEvents()
  console.log(events)

  return (
    <div>
      <main className="w-full overflow-x-clip">
        <nav className="flex flex-row bg-black p-4 container mx-auto items-center justify-between">
          <div className="text-white text-2xl font-bold">
            <span className="text-yellow-400">Event</span>Hive
          </div>
          <div>
            <img
              className="rounded-[50%]"
              src="https://avatars.githubusercontent.com/u/81812611?v=4"
              alt="profile-photo"
              height={50}
              width={50}
            />
          </div>
        </nav>

        <div className="event-filters">
          <section>
            <div className="flex items-center justify-between p-4">
              <Button
                text={"Events"}
                color={"black"}
                onClick={() => {
                  router.push("/find-event");
                }}
              />
              <Button
                text={"Deals"}
                color={"yellow-400 text-black"}
                onClick={() => {
                  router.push("/deals");
                }}
              />
            </div>
          </section>
        </div>
        <div className="h-auto">
          <section className="flex items-center justify-center">
            <div className="relative h-[33rem] w-[20rem] cards-container  bg-black p-2">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {events?.map((event:any)=>{

                  return (
                    <SwiperSlide
                      key={event?._id}
                      onClick={(e) => gotoEventProfile(e, event?._id)}
                      className=""
                    >
                      <div className="event-image flex flex-col h-full justify-between">
                        <div className="flex flex-col items-center h-fit justify-between">
                          <img
                            src={event?.eventFlyer}
                            alt="event-image"
                            height="auto"
                            width="320px"
                            // width={"400px"}
                            // height={"400px"}
                            className="eventFlyerImg object-contain w-full h-auto "
                          />
                        </div>
                        <div className="event-description flex flex-col items-center mb-2">
                          <h2 className="font-extrabold text-3xl">{event.eventTitle}</h2>
                          <div className="details">
                            <span className="text-sm font-bold">
                              sat, 21 oct@4:20PM
                            </span>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })} 
                
                
              </Swiper>
            </div>
          </section>
        </div>

        <section className="pt-5">
          <div className="flex items-center justify-between p-4 font-bold text-white">
            <p>Discover Events</p>
            <Link href={"/show-all"}>show all</Link>
          </div>
          <div className="discover-cards flex flex-col space-y-2 p-4 bg-black font-bold">
            <div className="relative border-2 border-black">
              <img
                src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg"
                alt="banner-img"
                className="w-full h-auto"
              />
              <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                Parties
              </div>
            </div>
            <div className="relative border border-black">
              <img
                src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg"
                alt="banner-img"
                className="w-full h-auto"
              />
              <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                Parties
              </div>
            </div>
            <div className="relative border border-black">
              <img
                src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg"
                alt="banner-img"
                className="w-full h-auto"
              />
              <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                Parties
              </div>
            </div>
            <div className="relative border border-black">
              <img
                src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg"
                alt="banner-img"
                className="w-full h-auto"
              />
              <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white p-2 text-sm">
                Parties
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
