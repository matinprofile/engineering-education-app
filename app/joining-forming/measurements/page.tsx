import { JoiningFormingGuidePage } from "@/components/joining-forming/JoiningFormingGuidePage";
import { measurementsGuide } from "@/lib/joining-forming-guides";

export default function MeasurementsPage() {
  return <JoiningFormingGuidePage guide={measurementsGuide} />;
}