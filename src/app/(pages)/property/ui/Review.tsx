import Image from "next/image";

export default function Review() {
  return (
    <div className=" rounded-3xl h-40 col-span-6 flex flex-col ">
      <div className="flex gap-6  py-5">
        <div className="rounded-full overflow-hidden self-center h-15 w-15 relative">
          <Image src="/images/HomesPics/ProfilePic.jpg" alt="home image" fill />
        </div>
        <div>
          <div className="font-semibold">Jean-Claude</div>
          <div>Victoria, Canada</div>
        </div>
      </div>
      <div className="grow-1 overflow-scroll pr-20 scrollbar-hide">
        The place was everything my husband and I needed for two nights in
        Paris! The place was warm and so was the shower. The host was very quick
        to respond to anything we needed The place was everything my husband and
        I needed for two nights in Paris! The place was warm and so was the
        shower. The host was very quick to respond to anything we needed The
        place was everything my husband and I needed for two nights in Paris!
        The place was warm and so was the shower. The host was very quick to
        respond to anything we needed
      </div>
    </div>
  );
}
