import Calendar from "./CalendarProperty";
import { PropertyData } from "../types/types";
export default function CalendarSection({
  propertyData,
}: {
  propertyData?: PropertyData | null;
}) {
  if (!propertyData) {
    return null;
  }
  return (
    <div className="grid grid-cols-12 gap-5 my-6 py-5">
      <div className="col-span-full">
        <div className="font-semibold text-2xl">{`2 nights in ${propertyData.property?.city_name}`}</div>
        <div>Mar 27, 2026 - Mar 29, 2026</div>
      </div>

      <div className="col-span-6 rounded-3xl overflow-hidden">
        <Calendar monthType="start" />
      </div>
      <div className="col-span-6 rounded-3xl overflow-hidden">
        <Calendar monthType="start" />
      </div>
    </div>
  );
}
