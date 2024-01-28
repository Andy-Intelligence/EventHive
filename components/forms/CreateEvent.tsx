"use client";
import React, { useState } from "react";
import Button from "../layoutComponents/Button";
import { useRouter } from "next/navigation";

const CreateEvent = () => {
  const router = useRouter();
  const eventDefaultData = {
    eventId: "",
    eventFlyer: "",
    eventTitle: "",
    eventDate: "",
    eventDetails: "",
    eventCategory: "",
    eventLocation: "",
    eventDescription: "",
    eventEntertainments: "", // Assuming it's an array of entertainment options
    eventTopic: "",
    eventTime: "", // Assuming it's a specific time format
    eventGuest: "", // Assuming it's an array of guests
    eventFee: 0, // Assuming it's a numerical value
    eventGenderRequirement: "", // Assuming it's a specific gender requirement
    eventAgeRequirement: "", // Assuming it's a specific age requirement
    eventTimeline: "", // Assuming it's a textual description of the timeline
    eventWebsite: "", // Assuming it's a URL
    eventOrganiser: "", // Assuming it's the organizer's name or identifier
    eventSponsor: "", // Assuming it's the sponsor's name or identifier
    // eventVerification: false, // Assuming it's a verification status
    eventDressCode: "", // Assuming it's a dress code description
    // eventAttendanceCount: 0, // Assuming it's a numerical count
    eventMaximumAttendanceNeeded: 0, // Assuming it's a numerical value
    eventEnquiryPhoneNumber: "", // Assuming it's a phone number
    eventLocationForinteractiveMap: "", // Assuming it's a location description or coordinates
    eventActivities: "", // Assuming it's a description of activities
    // eventComments: [], // Assuming it's an array of comments
    // eventReviews: [], // Assuming it's an array of reviews
  };

  const [formData, setFormData] = useState(eventDefaultData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await fetch("http://localhost:3000/api/event", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: { "Content-Type": "application/json" },
      });

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
    <div className="createForm font-sans flex items-center justify-center w-full p-5 ">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center">
        <h1 className="font-extrabold font-sans text-3xl mb-4">Create Your Event</h1>

        </div>

        <label className="createEventLabel">Title</label>
        <input
          className="createEventInput"
          type="text"
          placeholder=""
          id="eventTitle"
          name="eventTitle"
          onChange={handleChange}
          required={true}
          value={formData.eventTitle}
        />
        <label className="createEventLabel">Flyer</label>
        <input
          className="createEventInput"
          type="text"
          id="flyer"
          name="eventFlyer"
          onChange={handleChange}
          required={true}
          value={formData.eventFlyer}
        />
        <label className="createEventLabel">Date</label>
        <input
          className="createEventInput"
          type="date"
          id="date"
          name="eventDate"
          onChange={handleChange}
          required={true}
          value={formData.eventDate}
        />
        <label className="createEventLabel">details</label>
        <input
          className="createEventInput"
          type="text"
          id="details"
          name="eventDetails"
          onChange={handleChange}
          required={true}
          value={formData.eventDetails}
        />
        <label className="createEventLabel">Category</label>
        <select
          className="createEventInput"
          id="category"
          name="eventCategory"
          onChange={handleChange}
          required={true}
          value={formData.eventCategory}
        >
          <option value={"parties"}>parties</option>
          <option value={"recreational"}>recreational</option>
          <option value={"artAndCulture"}>Arts and Culture</option>
          <option value={"restaurantAndLounges"}>recreational</option>
          <option value={"concerts"}>Concerts</option>
          <option value={"matchMaking"}>MatchMaking</option>
        </select>
        <label className="createEventLabel">Location</label>
        <input
          className="createEventInput"
          type="text"
          id="location"
          name="eventLocation"
          onChange={handleChange}
          required={true}
          value={formData.eventLocation}
        />
        <label className="createEventLabel">Description</label>
        <input
          className="createEventInput"
          type="text"
          id="description"
          name="eventDescription"
          onChange={handleChange}
          required={true}
          value={formData.eventDescription}
        />
        <label className="createEventLabel">Entertainments</label>
        <input
          className="createEventInput"
          type="text"
          id="entertainments"
          name="eventEntertainments"
          onChange={handleChange}
          required={true}
          value={formData.eventEntertainments}
        />
        <label className="createEventLabel">Topic</label>
        <input
          className="createEventInput"
          type="text"
          id="topic"
          name="eventTopic"
          onChange={handleChange}
          required={true}
          value={formData.eventTopic}
        />
        <label className="createEventLabel">Time</label>
        <input
          className="createEventInput"
          type="time"
          id="time"
          name="eventTime"
          onChange={handleChange}
          required={true}
          value={formData.eventTime}
        />
        <label className="createEventLabel">Guests</label>
        <input
          className="createEventInput"
          type="text"
          id="guest"
          name="eventGuest"
          onChange={handleChange}
          required={true}
          value={formData.eventGuest}
        />
        <label className="createEventLabel">Fee</label>
        <input
          className="createEventInput"
          type="text"
          id="fee"
          name="eventFee"
          onChange={handleChange}
          required={true}
          value={formData.eventFee}
        />
        <label className="createEventLabel">Required Gender</label>
        <select
          className="createEventInput"
          id="genderRequirement"
          name="eventGenderRequirement"
          onChange={handleChange}
          required={true}
          value={formData.eventGenderRequirement}
        >
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </select>
        <label className="createEventLabel">Required Age</label>
        <input
          className="createEventInput"
          type="number"
          id="ageRequirement"
          name="eventAgeRequirement"
          onChange={handleChange}
          required={true}
          value={formData.eventAgeRequirement}
        />
        <label className="createEventLabel">Timeline</label>
        <input
          className="createEventInput"
          type="timeline"
          id="timeline"
          name="eventTimeline"
          onChange={handleChange}
          required={true}
          value={formData.eventTimeline}
        />
        <label className="createEventLabel">Website</label>
        <input
          className="createEventInput"
          type="text"
          id="website"
          name="eventWebsite"
          onChange={handleChange}
          required={true}
          value={formData.eventWebsite}
        />
        <label className="createEventLabel">Organiser</label>
        <input
          className="createEventInput"
          type="text"
          id="organiser"
          name="eventOrganiser"
          onChange={handleChange}
          required={true}
          value={formData.eventOrganiser}
        />
        <label className="createEventLabel">Sponsor</label>
        <input
          className="createEventInput"
          type="text"
          id="sponsor"
          name="eventSponsor"
          onChange={handleChange}
          required={true}
          value={formData.eventSponsor}
        />
        {/* <label>Verification</label>
        <input
          type="checkbox"
          id="verification"
          name="verification"
          onChange={handleChange}
          required={true}
          checked
          value={formData.eventVerification}
        /> */}
        <label className="createEventLabel">Dress Code</label>
        <input
          className="createEventInput"
          type="text"
          id="dressCode"
          name="eventDressCode"
          onChange={handleChange}
          required={true}
          value={formData.eventDressCode}
        />
        {/* <label>Attendance Count</label>
        <input
          type="number"
          id="attendanceCount"
          name="attendanceCount"
          onChange={handleChange}
          required={true}
          value={formData.eventAttendanceCount}
        /> */}
        <label className="createEventLabel">Maximum Attendance Needed</label>
        <input
          className="createEventInput"
          type="number"
          id="maximumAttendanceNeeded"
          name="eventMaximumAttendanceNeeded"
          onChange={handleChange}
          required={true}
          value={formData.eventMaximumAttendanceNeeded}
        />
        <label className="createEventLabel">Enquiry Number</label>
        <input
          className="createEventInput"
          type="text"
          id="enquiryNumber"
          name="eventEnquiryPhoneNumber"
          onChange={handleChange}
          required={true}
          value={formData.eventEnquiryPhoneNumber}
        />
        <label className="createEventLabel">Event Coordinates</label>
        <input
          className="createEventInput"
          type="text"
          id="coordinates"
          name="eventLocationForinteractiveMap"
          onChange={handleChange}
          required={true}
          value={formData.eventLocationForinteractiveMap}
        />
        <label className="createEventLabel">Location</label>
        <input
          className="createEventInput"
          type="text"
          id="location"
          name="eventLocation"
          onChange={handleChange}
          required={true}
          value={formData.eventLocation}
        />
        <label className="createEventLabel">Activities</label>
        <input
          className="createEventInput"
          type="text"
          id="activities"
          name="eventActivities"
          onChange={handleChange}
          required={true}
          value={formData.eventActivities}
        />

        <div className="w-full flex items-center justify-center">
          <Button color="black my-5" text="Create" onSubmit={(e)=>handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
