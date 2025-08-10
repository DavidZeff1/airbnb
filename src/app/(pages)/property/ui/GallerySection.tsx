import Image from "next/image";
export default function GallerySection() {
  return (
    <div className=" h-100 grid grid-cols-12 grid-rows-2 gap-6  my-6 rounded-3xl overflow-hidden">
      <div className="relative col-span-6 row-span-2">
        <Image src="/images/HomesPics/home1.jpg" alt="home image" fill />
      </div>

      <div className="relative col-span-3">
        <Image src="/images/HomesPics/home1.jpg" alt="home image" fill />
      </div>
      <div className="relative col-span-3">
        <Image src="/images/HomesPics/home1.jpg" alt="home image" fill />
      </div>
      <div className="relative col-span-3">
        <Image src="/images/HomesPics/home1.jpg" alt="home image" fill />
      </div>
      <div className="relative col-span-3">
        <Image src="/images/HomesPics/home1.jpg" alt="home image" fill />
      </div>
    </div>
  );
}
