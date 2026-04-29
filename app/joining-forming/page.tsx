import { TopicPage } from "@/components/topic/TopicPage";
import { topicPageContent } from "@/lib/topics";

export default function JoiningFormingPage() {
  const content = topicPageContent["joining-forming"];
  return <TopicPage {...content} />;
}
