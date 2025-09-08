//guest dropdown component - UPDATED FOR RESPONSIVENESS
import { useTrip } from "../Context/TripContext";

export default function GuestDropDown() {
  const { who, setWho } = useTrip();

  const getCurrentWho = () => who || { adults: 0, children: 0, infants: 0 };

  return (
    <div className="absolute bg-white right-0 left-0 lg:left-auto lg:w-80 top-16 lg:top-20 text-left rounded-3xl z-20 flex flex-col gap-2 p-4 border-2 border-gray-200 shadow-lg max-h-96 overflow-y-auto mx-4 lg:mx-0">
      {/* Adults */}
      <div className="w-full flex justify-between items-center p-3 border-b border-gray-200">
        <div className="flex-1">
          <p className="text-sm font-semibold">Adults</p>
          <p className="text-xs text-gray-500">Ages 13 or above</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const current = getCurrentWho();
              if (current.adults > 0) {
                setWho({
                  adults: current.adults - 1,
                  children: current.children,
                  infants: current.infants,
                });
              }
            }}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
            disabled={getCurrentWho().adults === 0}
          >
            −
          </button>
          <span className="w-8 text-center font-medium">
            {getCurrentWho().adults}
          </span>
          <button
            onClick={() => {
              const current = getCurrentWho();
              setWho({
                adults: current.adults + 1,
                children: current.children,
                infants: current.infants,
              });
            }}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="w-full flex justify-between items-center p-3 border-b border-gray-200">
        <div className="flex-1">
          <p className="text-sm font-semibold">Children</p>
          <p className="text-xs text-gray-500">Ages 2 - 12</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const current = getCurrentWho();
              if (current.children > 0) {
                setWho({
                  adults: current.adults,
                  children: current.children - 1,
                  infants: current.infants,
                });
              }
            }}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
            disabled={getCurrentWho().children === 0}
          >
            −
          </button>
          <span className="w-8 text-center font-medium">
            {getCurrentWho().children}
          </span>
          <button
            onClick={() => {
              const current = getCurrentWho();
              setWho({
                adults: current.adults,
                children: current.children + 1,
                infants: current.infants,
              });
            }}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Infants */}
      <div className="w-full flex justify-between items-center p-3">
        <div className="flex-1">
          <p className="text-sm font-semibold">Infants</p>
          <p className="text-xs text-gray-500">Ages 0 - 2</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const current = getCurrentWho();
              if (current.infants > 0) {
                setWho({
                  adults: current.adults,
                  children: current.children,
                  infants: current.infants - 1,
                });
              }
            }}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
            disabled={getCurrentWho().infants === 0}
          >
            −
          </button>
          <span className="w-8 text-center font-medium">
            {getCurrentWho().infants}
          </span>
          <button
            onClick={() => {
              const current = getCurrentWho();
              setWho({
                adults: current.adults,
                children: current.children,
                infants: current.infants + 1,
              });
            }}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
