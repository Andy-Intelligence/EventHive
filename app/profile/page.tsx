// "use client";
import Link from "next/link";

import AccordionUsage from "@/components/ProfileSetting";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Avatar from '@/public/assets/avatar.png'
import Avatar1 from '@/public/assets/avatar1.png'
import Image from "next/image";
import { getCurrentUser } from "@/utils/getUserDetails";


const Register = async () => {
  const session = await getServerSession(options)
  const userDetails = await getCurrentUser()
  const plainUserObject = userDetails ? JSON.parse(JSON.stringify(userDetails)) : null;

  return (
    <div className="createForm font-sans flex flex-col items-center justify-center w-full p-5 gap-5">
      <section>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h1 className="font-extrabold font-sans text-3xl mb-4">Profile</h1>
          {session?.user?.image ? (
            <img
              src={session?.user?.image as string}
              alt="event-image"
              height="200px"
              width="200px"
              className="object-contain  rounded-full "
            />
          ) : (
            <Image
              className="rounded-[50%] h-[200px] w-[200px]"
              src={Avatar1?.src}
              alt="profile-photo"
              width={200}
              height={200}
            />
          )}
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <div className="text-lg rounded-md p-2 font-bold">
            {plainUserObject?._id}
          </div>
        </div>
      </section>
      <AccordionUsage userDetails={plainUserObject} />
      <div></div>
    </div>
  );
};

export default Register;
