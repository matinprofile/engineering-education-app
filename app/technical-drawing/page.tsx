import { TopicPage } from "@/components/topic/TopicPage";
import { topicPageContent } from "@/lib/topics";

export default function TechnicalDrawingPage() {
  const content = topicPageContent["technical-drawing"];
  return <TopicPage {...content} />;
}
