import { TopicPage } from "@/components/topic/TopicPage";
import { topicPageContent } from "@/lib/topics";

export default function MaterialSciencePage() {
  const content = topicPageContent["material-science"];
  return <TopicPage {...content} />;
}
