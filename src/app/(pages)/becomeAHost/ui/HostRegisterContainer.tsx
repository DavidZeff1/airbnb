"use client";
import { useSession } from "next-auth/react";
import PropertyTypeContainer from "./PropertyTypeContainer";
export default function HostRegisterContainer() {
  const { data: session } = useSession();
  if (!session) {
    return <div>Please log in to become a host.</div>;
  }
  return (
    <div className="py-8 px-50 flex flex-col gap-15">
      <PropertyTypeContainer />
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Select Town or City</h1>
        <div>
          <input type="text" placeholder="Enter city or town" />
          <button>Search</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter An Address</h1>
        <div>
          <input type="text" placeholder="Street Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State/Province" />
          <input type="text" placeholder="Postal Code" />
          <input type="text" placeholder="Country" />
          <button>Submit</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter A Title</h1>
        <div>
          <input type="text" placeholder="Title" />
          <button>Submit</button>
        </div>
      </div>

      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter A Description</h1>
        <div>
          <textarea placeholder="Description"></textarea>
          <button>Submit</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter Bedroom Amount</h1>
        <div>
          <input type="number" placeholder="Number of Bedrooms" min="0" />
          <button>Submit</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter Bathroom Amount</h1>
        <div>
          <input type="number" placeholder="Number of Bathrooms" min="0" />
          <button>Submit</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter Guest Capacity</h1>
        <div>
          <input type="number" placeholder="Guest Capacity" min="1" />
          <button>Submit</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Enter Price Per Night</h1>
        <div>
          <input
            type="number"
            placeholder="Price Per Night"
            min="0"
            step="0.01"
          />
          <button>Submit</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Add Images</h1>
        <div>
          <input type="file" multiple />
          <button>Upload</button>
        </div>
      </div>
      <div className="p-3 border border-gray-100 shadow rounded">
        <h1>Add Ammenities</h1>
        <div>
          <label>
            <input type="checkbox" value="WiFi" /> WiFi
          </label>
          <label>
            <input type="checkbox" value="Parking" /> Parking
          </label>
          <label>
            <input type="checkbox" value="Pool" /> Pool
          </label>
          <label>
            <input type="checkbox" value="Air Conditioning" /> Air Conditioning
          </label>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
