import { TopicPage } from "@/components/topic/TopicPage";
import { topicPageContent } from "@/lib/topics";

export default function AdhesiveBondingPage() {
  const content = topicPageContent["adhesive-bonding"];
  return <TopicPage {...content} />;
}
