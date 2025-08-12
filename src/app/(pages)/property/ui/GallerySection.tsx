import Image from "next/image";
import { PropertyData } from "../types/types";
export default function GallerySection({
  propertyData,
}: {
  propertyData: PropertyData | null;
}) {
  if (!propertyData) {
    return null;
  }
  return (
    <div className=" h-100 grid grid-cols-12 grid-rows-2 gap-6  my-6 rounded-3xl overflow-hidden">
      {propertyData.images.map((image, index) => {
        if (index == 0) {
          return (
            <div
              key={index + image.image_url}
              className="relative col-span-6 row-span-2"
            >
              <Image src={image.image_url} alt="home image" fill />
            </div>
          );
        } else {
          return (
            <div key={index + image.image_url} className="relative col-span-3">
              <Image src={image.image_url} alt="home image" fill />
            </div>
          );
        }
      })}
    </div>
  );
}
