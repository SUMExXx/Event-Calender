"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

import { useDateContext } from "@/context/DateContext"
import { useState } from "react"
import EventCard from "./eventCard";

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

export function AppSidebar() {

  const {date} = useDateContext()

  const [forceRender, setForceRender] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string | undefined>("Event")
  const [eventDesc, setEventDesc] = useState<string | undefined>("")
  const [startHour, setStartHour] = useState<number>(12)
  const [startMin, setStartMin] = useState<number>(0)
  const [startAmPm, setStartAmPm] = useState<string>("AM")

  const [endHour, setEndHour] = useState<number>(11)
  const [endMin, setEndMin] = useState<number>(59)
  const [endAmPm, setEndAmPm] = useState<string>("PM")

  const hours = Array.from({length: 12}, (_, i) => i + 1)
  const mins = Array.from({length: 60}, (_, i) => i)
  const ampms = ["AM", "PM"]

  const getEvent = () => {
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

  const saveEvent = () => {
    const eventCheck = localStorage.getItem("events")
    if(!eventCheck) {
      localStorage.setItem("events", "[]")
    }
    const events = localStorage.getItem("events")
    if(events) {
      const events2 = JSON.parse(events) as Array<EventDay>
      if(events){
        const event = {
          id: Math.random().toString(36).substr(2, 9),
          name: eventName? eventName: "Event",
          description: eventDesc? eventDesc: "",
          date: date,
          startHour: startHour,
          startMin: startMin,
          startAmPm: startAmPm,
          endHour: endHour,
          endMin: endMin,
          endAmPm: endAmPm
        }
        events2.push(event)
        localStorage.setItem("events", JSON.stringify(events2))
        toast(`${eventName}`, {
          description: eventDesc!=""? `${eventDesc}`: "No Description",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        setForceRender(!forceRender)
      }
    }
  }

  const handleUpdate = () => {
    setForceRender(!forceRender)
  }

  return (
    <Sidebar className="w-96">
      <SidebarHeader>
        Events on {date? `${date.toDateString()}`: ""}
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full w-full p-4">
          <SidebarGroup className="h-full flex flex-col gap-4">
            {
              getEvent().map((event, index) => (
                <EventCard key={index} event={event} onUpdate={handleUpdate}/>
              ))
            }
          </SidebarGroup>
        </ScrollArea>
        <SidebarGroup>
          <Sheet>
            <SheetTrigger asChild>
              <Button>{`Create Event`}</Button>
            </SheetTrigger>
            <SheetContent side={`right`}>
              <SheetHeader>
                <SheetTitle>Create Event for {date?.toDateString()}</SheetTitle>
                <SheetDescription>
                  {`Create your event here. Click save when you're done.`}
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ename" className="text-right">
                    Name
                  </Label>
                  <Input id="ename" onChange={(event) => setEventName(event.target.value)} placeholder="John's Birthday" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">
                    Description (Optional)
                  </Label>
                  <Input id="desc" onChange={(event) => setEventDesc(event.target.value)} placeholder="Buy some presents and visit John" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">
                    Start Time
                  </Label>
                  <Select onValueChange={(value) => setStartHour(parseInt(value))}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Hour" />
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
                      <SelectValue placeholder="Mins" />
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
                      <SelectValue placeholder="AM" />
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
                      <SelectValue placeholder="Hour" />
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
                      <SelectValue placeholder="Mins" />
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
                      <SelectValue placeholder="AM" />
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
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" onClick={() => {saveEvent()}}>Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
