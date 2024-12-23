import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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

interface EventCardProps {
  event: EventDay;
  onUpdate: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onUpdate }) => {

    const [eventName, setEventName] = useState<string | undefined>(event.name)
    const [eventDesc, setEventDesc] = useState<string | undefined>(event.description)
    const [startHour, setStartHour] = useState<number>(event.startHour)
    const [startMin, setStartMin] = useState<number>(event.startMin)
    const [startAmPm, setStartAmPm] = useState<string>(event.startAmPm)

    const [endHour, setEndHour] = useState<number>(event.endHour)
    const [endMin, setEndMin] = useState<number>(event.endMin)
    const [endAmPm, setEndAmPm] = useState<string>(event.endAmPm)

    const hours = Array.from({length: 12}, (_, i) => i + 1)
    const mins = Array.from({length: 60}, (_, i) => i)
    const ampms = ["AM", "PM"]

    const deleteEvent = () => {
        if (typeof window !== "undefined") {
            const events = localStorage.getItem("events");
            if (events) {
                const eventsArray = JSON.parse(events) as Array<EventDay>;
                const updatedEvents = eventsArray.filter((ev) => ev.id !== event.id);
                localStorage.setItem("events", JSON.stringify(updatedEvents));
                onUpdate();
            }
        }
    }

    const saveChanges = () => {
        if (typeof window !== "undefined") {
            const events = localStorage.getItem("events");
            if (events) {
                const eventsArray = JSON.parse(events) as Array<EventDay>;
                const updatedEvents = eventsArray.map((ev) => {
                    if (ev.id === event.id) {
                        return {
                            ...ev,
                            name: eventName,
                            description: eventDesc,
                            startHour: startHour,
                            startMin: startMin,
                            startAmPm: startAmPm,
                            endHour: endHour,
                            endMin: endMin,
                            endAmPm: endAmPm
                        }
                    }
                    return ev;
                });
                localStorage.setItem("events", JSON.stringify(updatedEvents));
                onUpdate();
            }
        }
    }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {`From ${event.startHour}:${event.startMin} ${event.startAmPm} to ${event.endHour}:${event.endMin} ${event.endAmPm}`}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>
                    {`Make changes to your event here. Click save when you're done.`}
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Name
                        </Label>
                        <Input id="editname" onChange={(e) => {setEventName(e.target.value)}} value={eventName} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Description
                        </Label>
                        <Input id="username" onChange={(e) => {setEventDesc(e.target.value)}} value={eventDesc} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Start Time
                        </Label>
                        <Select onValueChange={(value) => setStartHour(parseInt(value))}>
                            <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder={event.startHour} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {
                                    hours.map(hour => <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>)
                                }  
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setStartMin(parseInt(value))}>
                            <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder={event.startMin} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {
                                    mins.map(min => <SelectItem key={min} value={min.toString()}>{min}</SelectItem>)
                                }                        
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setStartAmPm(value)}>
                            <SelectTrigger className="w-full">
                            <SelectValue placeholder={event.startAmPm} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {
                                ampms.map(ampm => <SelectItem key={ampm} value={ampm}>{ampm}</SelectItem>)
                                }                        
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            End Time
                        </Label>
                        <Select onValueChange={(value) => setEndHour(parseInt(value))}>
                            <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder={event.endHour} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {
                                hours.map(hour => <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>)
                                }  
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setEndMin(parseInt(value))}>
                            <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder={event.endMin} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {
                                mins.map(min => <SelectItem key={min} value={min.toString()}>{min}</SelectItem>)
                                }                        
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setEndAmPm(value)}>
                            <SelectTrigger className="w-full">
                            <SelectValue placeholder={event.endAmPm} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {
                                ampms.map(ampm => <SelectItem key={ampm} value={ampm}>{ampm}</SelectItem>)
                                }                        
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                <Button type="submit" onClick={saveChanges}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <Button onClick={() => {deleteEvent()}}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;