type EventDay = {
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

export const overlapChecker = (event: EventDay, events: EventDay[]) => {
  for (let i = 0; i < events.length; i++) {
    if (
      (event.startHour < events[i].endHour ||
        (event.startHour === events[i].endHour && event.startMin < events[i].endMin)) &&
      (event.endHour > events[i].startHour ||
        (event.endHour === events[i].startHour && event.endMin > events[i].startMin))
    ) {
      return true;
    }
  }
  return false;
};