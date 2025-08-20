import Image from "next/image";
import { Booking } from "../types/Booking";
import Link from "next/link";

export default function BookingCard({ booking }: { booking: Booking }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link
      href={`/property?id=${booking.property_id}`}
      className="flex flex-col w-75 h-80 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50  hover:cursor-pointer"
    >
      <Image
        src={booking.image_url || "/placeholder-image.png"}
        alt="Property"
        width={500}
        height={300}
        className="w-full h-3/4 rounded-lg shadow-md"
      />
      <p className="text-gray-600 mt-2">Property ID: {booking.property_id}</p>
      <p className="text-gray-600 mt-1">
        {formatDate(booking.check_in_date)} -
        {formatDate(booking.check_out_date)}
      </p>
      <p className="text-gray-600 mt-1">Total: ${booking.total_price}</p>
    </Link>
  );
}
