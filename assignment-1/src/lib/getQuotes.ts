import { quotes } from "./quotes";

export function getQuotesByTopic(topic: string) {
  return quotes
    .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
    .slice(0, 3);
}
