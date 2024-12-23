"use client";

import { Calendar } from "@/components/ui/calendar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useDateContext } from "@/context/DateContext";

export default function Home() {

  const {date, setDate} = useDateContext()

  return (
    <div className="flex w-full h-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full h-full">
          <SidebarTrigger />
          <div className="flex justify-center items-center w-full h-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => day && setDate(day)}
              className="rounded-md border scale-150"
            />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
