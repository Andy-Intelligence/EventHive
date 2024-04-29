import React from "react";
import { GiPartyPopper } from "react-icons/gi";
import { FaArtstation, FaStar } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { IoIosRestaurant } from "react-icons/io";
import { RiRidingLine } from "react-icons/ri";
import { BsSpeakerFill } from "react-icons/bs";
import { GiLovers } from "react-icons/gi";

interface CategoryButtonProps {
  text?: string;

  buttonStyle?: any;
  category?: string;
}

const CategoryButton = ({
  text,
  buttonStyle,
  category,
}: CategoryButtonProps) => {
  let icon;

  switch (category) {
    case "parties":
        icon = <GiPartyPopper />
      break

    case "artsandculture":
    icon = <FaArtstation />;
      break

    case "beach":
    icon = <FaUmbrellaBeach />;
      break

    case "restaurantandlounges":
    icon = <IoIosRestaurant />;
      break

    case "recreational":
        icon = <RiRidingLine />;
      break

    case "concerts":
        icon = <BsSpeakerFill />;
      break

    case "matchmaking":
        icon = <BsSpeakerFill />;
      break
    case "StarRating":
        icon = <FaStar />;
      break

      default:
        icon = null;
  }

  return (
    <div className={`${buttonStyle} flex px-2 py-1 gap-1 border border-black rounded-lg bg-black text-white`}>
      <div className="flex items-center justify-center ">{icon}</div>
      <div className="flex items-center justify-center">
        <p className="flex items-center justify-center text-center text-white">{text}</p>
      </div>
    </div>
  );
};

export default CategoryButton;
