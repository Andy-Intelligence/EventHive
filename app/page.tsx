// import Hero from "@/components/homeSectionComponents/Hero"

// export default function Home() {
//   return (
//     <main className="">
//       <Hero/>
//     </main>
//   )
// }

"use client"
// app/page.tsx

"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired route
    router.replace("/find-event");  // Replace "/new-route" with the route you want to navigate to
  }, [router]);

  return null; // Optionally render something while redirecting, or render nothing
}
