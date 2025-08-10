import Image from "next/image";
import ReviewSection from "./ReviewSection";
import GallerySection from "./GallerySection";
import CalendarSection from "./CalendarSection";
import AmmenitiesSection from "./AmmenitiesSection";
import FormSection from "./FormSection";

export default function PropertyBody() {
  return (
    <>
      <div className="mx-45 my-6">
        <h1 className="font-semibold text-2xl">Paris Studio </h1>
        <GallerySection />
        <div className="flex flex-col my-6 gap-6">
          <div className="grid grid-cols-12 my-6 gap-6 border-b-1 border-gray-300 p-6 ">
            <div className="col-span-8 ">
              <div>
                <div className="font-semibold">
                  Entire condo in Paris, France
                </div>
                <div>2 guests 1 bedroom 1 bed 1 bath</div>
              </div>

              <div className="border-b-1 border-gray-300 py-5">
                <div className="flex gap-6 py-3">
                  <div className="rounded-full overflow-hidden self-center h-15 w-15 relative">
                    <Image
                      src="/images/HomesPics/ProfilePic.jpg"
                      alt="home image"
                      fill
                    />
                  </div>
                  <div>
                    <div className="font-semibold">Hosted by Jean-Claude</div>
                    <div>Superhost 3 years hosting</div>
                  </div>
                </div>
              </div>
              <div className="border-b-1 border-gray-300 py-5">
                <p>
                  Small 14 m² studio, ideally located, in the heart of Paris 5
                  minutes from Place des Vosges, quiet overlooking a courtyard .
                  Shops, bars, restaurant, metro nearby. This apartment is
                  equipped with a kitchenette with a fridge and a hob and a
                  bathroom with a shower. Towels and bed linen are provided.
                </p>
              </div>

              <AmmenitiesSection />
              <CalendarSection />
            </div>
            <FormSection />
          </div>

          <ReviewSection />
        </div>
      </div>
    </>
  );
}
