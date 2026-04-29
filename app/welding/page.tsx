import { TopicPage } from "@/components/topic/TopicPage";
import { topicPageContent } from "@/lib/topics";

export default function WeldingPage() {
  const content = topicPageContent["welding"];
  return <TopicPage {...content} />;
}
