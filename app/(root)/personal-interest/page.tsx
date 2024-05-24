"use client"
import React from 'react'
import { useState } from 'react';
import Link from "next/link"
import Button from '@/components/layoutComponents/Button';
import { useRouter } from 'next/navigation';

interface Interest {
    name: string;
    imageSrc: string;
    selected?: boolean;
}

const personaQualities: Interest[] = [
  {
    name: "Yatch Cruise",
    imageSrc:
      "https://images.unsplash.com/photo-1607902618188-cd230ae71d50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWF0Y2glMjBjcnVpc2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Theatre",
    imageSrc: "/images/q_auto,w_60/v1607353743/tr7imojxybbfu36boh8d.png",
  },
  {
    name: "Paint Balling",
    imageSrc: "/images/q_auto,w_60/v1607354199/s3qnhuu6rxsxswxtyoiz.png",
  },
  {
    name: "Matchmaking",
    imageSrc: "/images/q_auto,w_60/v1607354587/sjjspa1fzuq0qhumhvdc.png",
  },
  {
    name: "Dancing",
    imageSrc: "/images/q_auto,w_60/v1607355434/tgl1a4dmsy4nfpqb7ewu.png",
  },
  {
    name: "High Energy",
    imageSrc: "/images/q_auto,w_60/v1607355561/gzw4g3qgkcq3ruq46lze.png",
  },
  {
    name: "Outdoor",
    imageSrc: "/images/q_auto,w_60/v1607355767/kk4icf7xf2gl47zdtiwc.png",
  },
  {
    name: "Comedy",
    imageSrc: "/images/q_auto,w_60/v1607354436/eziok6hl0jcivput1xnf.png",
  },
  {
    name: "Arcade",
    imageSrc: "/images/q_auto,w_60/v1607354647/i9q9yxm5cwd7yybdl1uv.png",
  },
  {
    name: "Gallery",
    imageSrc: "/images/q_auto,w_60/v1607354845/dr2kiskxkmfmkfdw6zbw.png",
  },
  {
    name: "Photography",
    imageSrc: "/images/q_auto,w_60/v1607355917/tzwtfbx4fxrwqdrjjjwa.png",
  },
  {
    name: "Swimming",
    imageSrc: "/images/q_auto,w_60/v1607354709/j57h3bwxff3yv4fxgt37.png",
  },
  {
    name: "Alcohol",
    imageSrc: "/images/q_auto,w_60/v1607354883/zplqoj2i9yzw9crm9euh.png",
  },
  {
    name: "Retro Nostalgia",
    imageSrc: "/images/q_auto,w_60/v1607355399/xtyq2bjjzbciy8onydr9.png",
  },
  {
    name: "Fashion",
    imageSrc: "/images/q_auto,w_60/v1607355882/vogwodkn97payhoyyi39.png",
  },
  {
    name: "Costume Party",
    imageSrc: "/images/q_auto,w_60/v1606273500/w5wduqmxhmob6hxfuqyt.png",
  },
  {
    name: "Foodie",
    imageSrc: "/images/q_auto,w_60/v1607353844/p7fuevujkqwfoquluqah.png",
  },
  {
    name: "Movies",
    imageSrc: "/images/q_auto,w_60/v1607353904/v3pnqzgkkfwtqbz9mxwc.png",
  },
  {
    name: "Painting",
    imageSrc: "/images/q_auto,w_60/v1607354522/iyfemhfy3cze1bwgarel.png",
  },
  {
    name: "Football",
    imageSrc: "/images/q_auto,w_60/v1607354747/xpvvxutxvpxduormyxz4.png",
  },
  {
    name: "Indoor",
    imageSrc: "/images/q_auto,w_60/v1607355613/zdouucmje60jhvrps9od.png",
  },
  {
    name: "Buffet",
    imageSrc: "/images/q_auto,w_60/v1607355102/jrhergtzr4rzertinepq.png",
  },
  {
    name: "Costume",
    imageSrc: "/images/q_auto,w_60/v1607353266/jqoqpafgdugymfq5wek2.png",
  },
  {
    name: "Games",
    imageSrc: "/images/q_auto,w_60/v1607353637/lvf1sh4srjpvqp54hk3y.png",
  },
  {
    name: "Costume Party",
    imageSrc: "/images/q_auto,w_60/v1607354314/ska7ew5qy2wvq257uavu.png",
  },
  {
    name: "Alcohol",
    imageSrc: "/images/q_auto,w_60/v1607353328/f3znpcb6tvkasjv9ulr1.png",
  },
  {
    name: "Alté",
    imageSrc: "/images/q_auto,w_60/v1607355239/mws1idwocystuconvqxy.png",
  },
  {
    name: "LGBTQ+",
    imageSrc: "/images/q_auto,w_60/v1607355718/kvqxcc8bpvq0heofj5l9.png",
  },
  {
    name: "Karaoke",
    imageSrc: "/images/q_auto,w_60/v1607357544/crhuao6l5y4lxsqkq8as.png",
  },
  {
    name: "Bowling",
    imageSrc: "/images/q_auto,w_60/v1607354404/sifwlizakecvrp7zkef9.png",
  },
  {
    name: "Go Karting",
    imageSrc: "/images/q_auto,w_60/v1607355479/vxrpe5e6ovumpqamtddv.png",
  },
  {
    name: "Smoking",
    imageSrc: "/images/q_auto,w_60/v1607355519/itlvn1izzdg9rx4rfsdk.png",
  },
  {
    name: "Calm Vibes",
    imageSrc: "/images/q_auto,w_60/v1607355841/b9owrzlv5rxnbiq0uwi0.png",
  },
  {
    name: "Loud Music",
    imageSrc: "/images/q_auto,w_60/v1607353693/jnh2vhhoxc0nwfit4fbn.png",
  },
  {
    name: "Beach",
    imageSrc: "/images/q_auto,w_60/v1607353872/jzuebdq4rubh5ek6gks8.png",
  },
  {
    name: "X-Rated",
    imageSrc: "/images/q_auto,w_60/v1607354467/nkap2pvezteja7gm2orl.png",
  },
  {
    name: "Clubbing",
    imageSrc: "/images/q_auto,w_60/v1607354617/ortcho2nhwmskjsjqxav.png",
  },
  {
    name: "Tours & Get Aways",
    imageSrc: "/images/q_auto,w_60/v1607354928/jos3o9godii73noewixu.png",
  },
  {
    name: "Live Music",
    imageSrc: "/images/q_auto,w_60/v1607353788/nl5lp9dapfrgatwbgmku.png",
  },
];

const page = () => {
  const router = useRouter()
      const [interests, setInterests] = useState<Interest[]>(personaQualities);
   
      
    //   console.log(personaQualities);
      

  const toggleInterest = (index: number) => {
    const updatedInterests = [...interests];
    updatedInterests[index].selected = !updatedInterests[index].selected;
    setInterests(updatedInterests);
  };

  return (
    <div className="container mx-auto font-sans">
      <div className="w-full flex items-center justify-center">
        <h1 className="text-4xl font-bold mt-4 mb-4"> Your Interests?</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {interests.map((interest, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center p-4 rounded-lg border border-gray-300 ${
              interest.selected ? "bg-gray-200" : ""
            }`}
            onClick={() => toggleInterest(index)}
          >
            {/* <img src={interest.imageSrc} alt={interest.name} className="w-20 h-20 object-cover mb-2" /> */}
            <span className="text-sm font-semibold">{interest.name}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        
          <Button
            text={"Continue"}
            color={"black text-white mb-8"}
            onClick={() => {
              router.push("/find-event");
            }}
          />
        
      </div>
    </div>
  );
}

export default page