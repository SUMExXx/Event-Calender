interface EventDay {
  id: string;
  name: string;
  description: string;
  date: Date;
  startHour: number;
  startMin: number;
  startAmPm: string;
  endHour: number;
  endMin: number;
  endAmPm: string;
}

// Helper function to get events from local storage
const getEvents = (date: Date): EventDay[] => {
  if (typeof window !== "undefined") {
    const events = localStorage.getItem("events");
      if (events) {
        const eventsArray = JSON.parse(events) as Array<EventDay>;
        return eventsArray.filter(
          (event) => new Date(event.date).toDateString() === date?.toDateString()
        );
      }
  }
  return [];
};

// Helper function to save events to local storage
const saveEvents = (events: EventDay[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("events", JSON.stringify(events));
  }
};

// Create a new event
export const createEvent = (event: EventDay) => {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
};

// Read all events
export const readEvents = (): EventDay[] => {
  return getEvents();
};

// Update an event by id
export const updateEvent = (updatedEvent: EventDay) => {
  let events = getEvents();
  events = events.map(event => event.id === updatedEvent.id ? updatedEvent : event);
  saveEvents(events);
};

// Delete an event by id
export const deleteEvent = (id: string) => {
  let events = getEvents();
  events = events.filter(event => event.id !== id);
  saveEvents(events);
};