"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Where = {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
};

type Who = {
  adults: number;
  children: number;
  infants: number;
};

type TripContextType = {
  // State
  startTripDate: Date | null;
  endTripDate: Date | null;
  where: Where | null;
  who: Who | null;

  // State setters
  setStartTripDate: (date: Date | null) => void;
  setEndTripDate: (date: Date | null) => void;
  setWhere: (where: Where | null) => void;
  setWho: (who: Who | null) => void;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [startTripDate, setStartTripDate] = useState<Date | null>(null);
  const [endTripDate, setEndTripDate] = useState<Date | null>(null);
  const [where, setWhere] = useState<Where | null>(null);
  const [who, setWho] = useState<Who | null>(null);

  return (
    <TripContext.Provider
      value={{
        // State
        startTripDate,
        endTripDate,
        where,
        who,

        // State setters
        setStartTripDate,
        setEndTripDate,
        setWhere,
        setWho,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
