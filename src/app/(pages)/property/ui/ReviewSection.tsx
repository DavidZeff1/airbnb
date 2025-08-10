import Review from "./Review";

export default function ReviewSection() {
  return (
    <div className="grid grid-cols-12 gap-5 my-6 border-b-1  border-gray-300 py-5">
      <div className="font-semibold text-2xl col-span-12">210 Reviews</div>
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
    </div>
  );
}
