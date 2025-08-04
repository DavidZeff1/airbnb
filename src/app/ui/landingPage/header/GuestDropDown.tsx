import { useTrip } from "../Context/TripContext";

export default function GuestDropDown() {
  const { who, setWho } = useTrip();

  // Helper function to get current values or defaults
  const getCurrentWho = () => who || { adults: 0, children: 0, infants: 0 };

  return (
    <div className="absolute bg-white h-fit w-90 right-0 top-23 text-left rounded-3xl z-10 flex flex-col justify-start gap-2 p-4 border-2 border-gray-200 shadow-lg overflow-y-auto justify-between">
      <div className="w-full h-20 flex justify-between items-center p-2 border-b-2 border-gray-200">
        <div>
          <p className="text-sm font-semibold">Adults</p>
          <p className="text-xs text-gray-500">Ages 13 or above</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p
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
            className="rounded-full hover:bg-gray-200 hover:cursor-pointer text-gray-600 h-fit w-fit p-1"
          >
            -
          </p>
          <p>{getCurrentWho().adults}</p>
          <p
            onClick={() => {
              const current = getCurrentWho();
              setWho({
                adults: current.adults + 1,
                children: current.children,
                infants: current.infants,
              });
            }}
            className="rounded-full hover:bg-gray-200 hover:cursor-pointer text-gray-600 h-fit w-fit p-1"
          >
            +
          </p>
        </div>
      </div>
      <div className="w-full h-20 flex justify-between items-center p-2 border-b-2 border-gray-200">
        <div>
          <p className="text-sm font-semibold">Children</p>
          <p className="text-xs text-gray-500">Ages 2 - 12</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p
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
            className="rounded-full hover:bg-gray-200 hover:cursor-pointer text-gray-600 h-fit w-fit p-1"
          >
            -
          </p>
          <p>{getCurrentWho().children}</p>
          <p
            onClick={() => {
              const current = getCurrentWho();
              setWho({
                adults: current.adults,
                children: current.children + 1,
                infants: current.infants,
              });
            }}
            className="rounded-full hover:bg-gray-200 hover:cursor-pointer text-gray-600 h-fit w-fit p-1"
          >
            +
          </p>
        </div>
      </div>
      <div className="w-full h-20 flex justify-between items-center p-2 border-b-2 border-gray-200">
        <div>
          <p className="text-sm font-semibold">Infants</p>
          <p className="text-xs text-gray-500">Ages 0 - 2</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p
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
            className="rounded-full hover:bg-gray-200 hover:cursor-pointer text-gray-600 h-fit w-fit p-1"
          >
            -
          </p>
          <p>{getCurrentWho().infants}</p>
          <p
            onClick={() => {
              const current = getCurrentWho();
              setWho({
                adults: current.adults,
                children: current.children,
                infants: current.infants + 1,
              });
            }}
            className="rounded-full hover:bg-gray-200 hover:cursor-pointer text-gray-600 h-fit w-fit p-1"
          >
            +
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}
