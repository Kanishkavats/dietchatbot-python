import Eventdetail from "@/src/components/Event/Eventdetail";
import { events } from "@/src/staticResource";

interface PageProps {
  params: { id: string };
}

export default function EventDetailsByIdPage({ params }: PageProps) {
  const eventId = Number(params.id);
  const event = events.find((e) => e.id === eventId);

  return (
    <>
      <Eventdetail blogId={`event-${eventId}`} event={event} />
    </>
  );
}


