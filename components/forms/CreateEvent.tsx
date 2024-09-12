"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../layoutComponents/Button";

interface UserProp {
  user: any;
}

const CreateEvent = ({ user }: UserProp) => {
  const router = useRouter();
  const [flyerImage, setFlyerImage] = useState<any>();
  const eventDefaultData = {
    eventId: "",
    eventHost: "",
    eventFlyer: "",
    eventTitle: "",
    eventDate: "",
    eventDetails: "",
    eventCategory: "",
    eventLocation: "",
    eventDescription: "",
    eventEntertainments: "",
    eventTopic: "",
    eventTime: "",
    eventGuest: "",
    eventFee: 0,
    eventGenderRequirement: "",
    eventAgeRequirement: "",
    eventTimeline: "",
    eventWebsite: "",
    eventOrganiser: "",
    eventSponsor: "",
    eventDressCode: "",
    eventMaximumAttendanceNeeded: 0,
    eventEnquiryPhoneNumber: "",
    eventLocationForinteractiveMap: "",
    eventLatitude: 0,
    eventLongitude: 0,
    eventActivities: "",
  };

  const [formData, setFormData] = useState(eventDefaultData);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFlyerImage(reader.result);
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    if (name === "eventCategory") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase(),
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      eventHost: user?._id,
      eventFlyer: flyerImage,
    };
    console.log(updatedFormData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event`,
        {
          method: "POST",
          body: JSON.stringify(updatedFormData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to create Event");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-10 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Your Event
        </h1>

        <div>
          <label
            htmlFor="eventTitle"
            className="block text-gray-600 font-semibold"
          >
            Title
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventTitle"
            name="eventTitle"
            onChange={handleChange}
            required
            value={formData.eventTitle}
          />
        </div>

        <div>
          <label
            htmlFor="eventFlyer"
            className="block text-gray-600 font-semibold"
          >
            Flyer
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="file"
            id="flyer"
            name="eventFlyer"
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="eventDate"
            className="block text-gray-600 font-semibold"
          >
            Date
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="date"
            id="eventDate"
            name="eventDate"
            onChange={handleChange}
            required
            value={formData.eventDate}
          />
        </div>
        {/* 
        <div>
          <label
            htmlFor="eventDetails"
            className="block text-gray-600 font-semibold"
          >
            Details
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventDetails"
            name="eventDetails"
            onChange={handleChange}
            required
            value={formData.eventDetails}
          />
        </div> */}

        <div>
          <label
            htmlFor="eventCategory"
            className="block text-gray-600 font-semibold"
          >
            Category
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            id="eventCategory"
            name="eventCategory"
            onChange={handleChange}
            required
            value={formData.eventCategory}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="parties">Parties</option>
            <option value="recreational">Recreational</option>
            <option value="artsandCulture">Arts and Culture</option>
            <option value="restaurantandlounges">Restaurant And Lounges</option>
            <option value="concerts">Concerts</option>
            <option value="matchmaking">MatchMaking</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="eventLocation"
            className="block text-gray-600 font-semibold"
          >
            Location
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventLocation"
            name="eventLocation"
            onChange={handleChange}
            required
            value={formData.eventLocation}
          />
        </div>

        <div>
          <label
            htmlFor="eventDescription"
            className="block text-gray-600 font-semibold"
          >
            Description
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventDescription"
            name="eventDescription"
            onChange={handleChange}
            required
            value={formData.eventDescription}
          />
        </div>

        <div>
          <label
            htmlFor="eventEntertainments"
            className="block text-gray-600 font-semibold"
          >
            Entertainments
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventEntertainments"
            name="eventEntertainments"
            onChange={handleChange}
            required
            value={formData.eventEntertainments}
          />
        </div>

        <div>
          <label
            htmlFor="eventTopic"
            className="block text-gray-600 font-semibold"
          >
            Topic
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventTopic"
            name="eventTopic"
            onChange={handleChange}
            required
            value={formData.eventTopic}
          />
        </div>

        <div>
          <label
            htmlFor="eventTime"
            className="block text-gray-600 font-semibold"
          >
            Time
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="time"
            id="eventTime"
            name="eventTime"
            onChange={handleChange}
            required
            value={formData.eventTime}
          />
        </div>

        <div>
          <label
            htmlFor="eventGuest"
            className="block text-gray-600 font-semibold"
          >
            Guests
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventGuest"
            name="eventGuest"
            onChange={handleChange}
            required
            value={formData.eventGuest}
          />
        </div>

        <div>
          <label
            htmlFor="eventFee"
            className="block text-gray-600 font-semibold"
          >
            Fee
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="number"
            id="eventFee"
            name="eventFee"
            onChange={handleChange}
            required
            value={formData.eventFee}
          />
        </div>
        {/* 
        <div>
          <label
            htmlFor="eventGenderRequirement"
            className="block text-gray-600 font-semibold"
          >
            Required Gender
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            id="eventGenderRequirement"
            name="eventGenderRequirement"
            onChange={handleChange}
            required
            value={formData.eventGenderRequirement}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div> */}

        {/* <div>
          <label
            htmlFor="eventAgeRequirement"
            className="block text-gray-600 font-semibold"
          >
            Required Age
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="number"
            id="eventAgeRequirement"
            name="eventAgeRequirement"
            onChange={handleChange}
            required
            value={formData.eventAgeRequirement}
          />
        </div> */}

        {/* <div>
          <label
            htmlFor="eventTimeline"
            className="block text-gray-600 font-semibold"
          >
            Timeline
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventTimeline"
            name="eventTimeline"
            onChange={handleChange}
            required
            value={formData.eventTimeline}
          />
        </div> */}

        <div>
          <label
            htmlFor="eventWebsite"
            className="block text-gray-600 font-semibold"
          >
            Website
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="url"
            id="eventWebsite"
            name="eventWebsite"
            onChange={handleChange}
            required
            value={formData.eventWebsite}
          />
        </div>

        <div>
          <label
            htmlFor="eventOrganiser"
            className="block text-gray-600 font-semibold"
          >
            Organiser
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventOrganiser"
            name="eventOrganiser"
            onChange={handleChange}
            required
            value={formData.eventOrganiser}
          />
        </div>

        <div>
          <label
            htmlFor="eventSponsor"
            className="block text-gray-600 font-semibold"
          >
            Sponsor
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventSponsor"
            name="eventSponsor"
            onChange={handleChange}
            required
            value={formData.eventSponsor}
          />
        </div>

        {/* <div>
          <label
            htmlFor="eventDressCode"
            className="block text-gray-600 font-semibold"
          >
            Dress Code
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventDressCode"
            name="eventDressCode"
            onChange={handleChange}
            required
            value={formData.eventDressCode}
          />
        </div> */}

        <div>
          <label
            htmlFor="eventMaximumAttendanceNeeded"
            className="block text-gray-600 font-semibold"
          >
            Maximum Attendance Needed
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="number"
            id="eventMaximumAttendanceNeeded"
            name="eventMaximumAttendanceNeeded"
            onChange={handleChange}
            required
            value={formData.eventMaximumAttendanceNeeded}
          />
        </div>

        <div>
          <label
            htmlFor="eventEnquiryPhoneNumber"
            className="block text-gray-600 font-semibold"
          >
            Enquiry Number
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventEnquiryPhoneNumber"
            name="eventEnquiryPhoneNumber"
            onChange={handleChange}
            required
            value={formData?.eventEnquiryPhoneNumber}
          />
        </div>

        <div>
          <label
            htmlFor="eventLocationForinteractiveMap"
            className="block text-gray-600 font-semibold"
          >
            Event Coordinates
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventLocationForinteractiveMap"
            name="eventLocationForinteractiveMap"
            onChange={handleChange}
            // required
            value={formData?.eventLocationForinteractiveMap}
          />
        </div>

        <div>
          <label
            htmlFor="eventLatitude"
            className="block text-gray-600 font-semibold"
          >
            Event Latitude
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="number"
            id="eventLatitude"
            name="eventLatitude"
            onChange={handleChange}
            value={formData.eventLatitude}
          />
        </div>

        <div>
          <label
            htmlFor="eventLongitude"
            className="block text-gray-600 font-semibold"
          >
            Event Longitude
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="number"
            id="eventLongitude"
            name="eventLongitude"
            onChange={handleChange}
            value={formData.eventLongitude}
          />
        </div>

        <div>
          <label
            htmlFor="eventActivities"
            className="block text-gray-600 font-semibold"
          >
            Activities
          </label>
          <input
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            type="text"
            id="eventActivities"
            name="eventActivities"
            onChange={handleChange}
            required
            value={formData.eventActivities}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            color="black my-5"
            text="Create"
            onSubmit={(e) => handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
