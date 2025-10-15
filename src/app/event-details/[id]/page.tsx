import Eventdetail from "@/src/components/Event/Eventdetail";
import { fetchEventById } from "@/src/services/eventApi";

interface PageProps {
  params: { id: string };
}

export default async function EventDetailsByIdPage({ params }: PageProps) {
  const eventId = params.id;
  
  try {
    const event = await fetchEventById(eventId);
    return (
      <>
        <Eventdetail blogId={`event-${eventId}`} event={event} />
      </>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Event not found</div>
      </div>
    );
  }
}


