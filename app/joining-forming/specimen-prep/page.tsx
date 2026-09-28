import { JoiningFormingGuidePage } from "@/components/joining-forming/JoiningFormingGuidePage";
import { specimenPreparationGuide } from "@/lib/joining-forming-guides";

export default function SpecimenPreparationPage() {
  return <JoiningFormingGuidePage guide={specimenPreparationGuide} />;
}