'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DateContextType {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

// Create the context
const DateContext = createContext<DateContextType | undefined>(undefined);

// Create a provider component
const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

const useDateContext = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};

export { DateProvider, useDateContext };