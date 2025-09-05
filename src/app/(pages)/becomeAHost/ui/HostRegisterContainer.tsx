"use client";
import { useSession } from "next-auth/react";
import PropertyTypeContainer from "./PropertyTypeContainer";
import ChooseLocationContainer from "./ChooseLocationContainer";
import AmmenitiesContainer from "./AmmenitiesContainer";
import AddImagesContainer from "./AddImagesContainer";

export default function HostRegisterContainer() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <p className="text-gray-600">Please log in to become a host.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="py-8 px-50 flex flex-col gap-15">
      <ChooseLocationContainer />

      <div className="p-3 border border-gray-100 shadow rounded">
        <h1 className="mb-3">Enter A Property Title</h1>
        <div>
          <input
            className="border border-gray-300 w-1/2 pb-30 p-2 rounded"
            type="text"
            placeholder="Title"
          />
        </div>
      </div>

      <div className="p-3 border border-gray-100 shadow rounded">
        <h1 className="mb-3">Enter A Property Description</h1>
        <div>
          <input
            className="border border-gray-300 w-1/2 pb-30 p-2 rounded"
            type="text"
            placeholder="Description"
          />
        </div>
      </div>

      <div className="p-3 border border-gray-100 shadow rounded flex gap-5 flex-wrap">
        <div>
          <h1 className="mb-3">Enter Bedroom Amount</h1>
          <input
            className="border border-gray-300 rounded-lg p-1"
            type="number"
            placeholder="Number of Bedrooms"
            min="0"
          />
        </div>
        <div>
          <h1 className="mb-3">Enter Bathroom Amount</h1>
          <input
            className="border border-gray-300 rounded-lg p-1"
            type="number"
            placeholder="Number of Bathrooms"
            min="0"
          />
        </div>
        <div>
          <h1 className="mb-3">Enter Guest Capacity</h1>
          <input
            className="border border-gray-300 rounded-lg p-1"
            type="number"
            placeholder="Number of Guests"
            min="0"
          />
        </div>
        <div>
          <h1 className="mb-3">Enter Price Per Night (Dollars)</h1>
          <input
            className="border border-gray-300 rounded-lg p-1"
            type="number"
            placeholder="Price Per Night"
            min="0"
            step="5"
          />
        </div>
      </div>
      <PropertyTypeContainer />
      <AmmenitiesContainer />

      <AddImagesContainer />
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-5 hover:cursor-pointer hover:bg-blue-600">
        Become Host
      </button>
    </div>
  );
}
