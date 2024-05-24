export default function SimilarUpcomingEventCard({ event }:any) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      {event.eventFlyer?.secure_url && (
        <img
          src={event.eventFlyer.secure_url}
          alt={event.eventTitle}
          className="w-full h-48 object-cover rounded-md"
        />
      )}
      <h3 className="text-xl font-bold mt-2">{event.eventTitle}</h3>
      {/* <p>{event.eventDescription}</p> */}
      <p>{new Date(event.eventDate).toLocaleDateString()}</p>
      {/* <p>{event.eventLocation}</p> */}
    </div>
  );
}
