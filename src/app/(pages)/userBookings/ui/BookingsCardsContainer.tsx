import { Booking } from "../types/Booking";
import BookingCard from "../ui/BookingCard";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export default async function BookingsCardsContainer() {
  let bookings: Booking[] = [];
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your bookings.</p>
      </div>
    );
  }
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/getBookings?id=${session.userId}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      bookings = await response.json();
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  const currentDate = new Date();
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.check_in_date) > currentDate
  );
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.check_out_date) < currentDate
  );
  return (
    <div className="p-4 min-h-screen flex flex-wrap">
      <div className="w-full md:w-1/2 p-2">
        <h2 className="text-xl font-semibold pb-5 text-center">
          Upcoming Trips ({upcomingBookings.length})
        </h2>
        <div className="flex flex-wrap gap-10 p-10">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No upcoming trips
            </p>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 p-2">
        <h2 className="text-xl font-semibold pb-5 text-center">
          Past Trips ({pastBookings.length})
        </h2>
        <div className="flex flex-wrap gap-10 p-10">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No past trips</p>
          )}
        </div>
      </div>
    </div>
  );
}
