"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TripDateContextType = {
  startTripDate: Date;
  endTripDate: Date;
  setStartTripDate: (date: Date) => void;
  setEndTripDate: (date: Date) => void;
};

const TripDateContext = createContext<TripDateContextType | undefined>(
  undefined
);

export function TripDateProvider({ children }: { children: ReactNode }) {
  const [startTripDate, setStartTripDate] = useState(new Date());
  const [endTripDate, setEndTripDate] = useState(new Date());

  return (
    <TripDateContext.Provider
      value={{ startTripDate, endTripDate, setStartTripDate, setEndTripDate }}
    >
      {children}
    </TripDateContext.Provider>
  );
}

export function useTripDate() {
  const context = useContext(TripDateContext);
  if (!context) {
    throw new Error("useTripDate must be used within a TripDateProvider");
  }
  return context;
}
