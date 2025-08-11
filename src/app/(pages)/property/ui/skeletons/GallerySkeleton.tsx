export default function GallerySkeleton() {
  return (
    <>
      <div className=" h-100 grid grid-cols-12 grid-rows-2 gap-6  my-6 rounded-3xl overflow-hidden">
        <div className="relative col-span-6 row-span-2 bg-gray-100 animate-pulse"></div>

        <div className="relative col-span-3 bg-gray-100 animation-pulse"></div>
        <div className="relative col-span-3 bg-gray-100 animation-pulse"></div>
        <div className="relative col-span-3 bg-gray-100 animation-pulse"></div>
        <div className="relative col-span-3 bg-gray-100 animation-pulse"></div>
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center ">
        <div className="w-20 h-20 rounded-full border-t-5 border-black-100 animate-spin"></div>
      </div>
    </>
  );
}
