export default function TripSkeletons() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-6/10 overflow-y-auto p-4 scrollbar-hide">
          <div className="ml-6 bg-gray-200 rounded-3xl flex flex-col w-60 h-6 p-3 animate-pulse m-3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
            <div className="bg-gray-200 rounded-3xl flex flex-col w-60 h-50 p-3 animate-pulse m-4"></div>
          </div>
        </div>

        <div className="w-4/10 rounded-lg m-4 h-screen overflow-hidden">
          <div className="bg-gray-200 rounded-3xl m-4  h-4/6 animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
