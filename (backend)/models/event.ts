import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
    eventId: { type: String, required: false },
    eventFlyer: { type: String, required: true },
    eventTitle: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventDetails: { type: String, required: true },
    eventCategory: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventEntertainments: { type: String },  // Assuming it's an array of entertainment options
    eventTopic: { type: String },
    eventTime: { type: String },  // Assuming it's a specific time format
    eventGuest: { type: String },  // Assuming it's an array of guests
    eventFee: { type: Number },  // Assuming it's a numerical value
    eventGenderRequirement: { type: String },  // Assuming it's a specific gender requirement
    eventAgeRequirement: { type: String },  // Assuming it's a specific age requirement
    eventTimeline: { type: String },  // Assuming it's a textual description of the timeline
    eventWebsite: { type: String },  // Assuming it's a URL
    eventOrganiser: { type: String },  // Assuming it's the organizer's name or identifier
    eventSponsor: { type: String },  // Assuming it's the sponsor's name or identifier
    eventVerification: { type: Boolean },  // Assuming it's a verification status
    eventDressCode: { type: String },  // Assuming it's a dress code description
    eventAttendanceCount: { type: Number },  // Assuming it's a numerical count
    eventMaximumAttendanceNeeded: { type: Number },  // Assuming it's a numerical value
    eventEnquiryPhoneNumber: { type: String },  // Assuming it's a phone number
    eventLocationForinteractiveMap: { type: String },  // Assuming it's a location description or coordinates
    eventActivities: { type: String },  // Assuming it's a description of activities
    eventComments: { type: String },  // Assuming it's an array of comments
    eventReviews: { type: String },  // Assuming it's an array of reviews
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
