"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TopicSelector } from "@/components/ui/Combobox";
import { getQuotesByTopic } from "@/lib/getQuotes";

const topics = [
  "success",
  "love",
  "wisdom",
  "humor",
  "hope",
  "courage",
  "life",
  "motivation",
  "kindness",
  "learning",
  "friendship",
  "creativity",
  "honesty",
  "time",
  "patience",
  "growth",
  "education",
  "failure",
  "leadership",
  "confidence",
  "dreams",
  "peace",
  "empathy",
  "mindfulness",
  "perspective",
  "discipline",
  "innovation",
  "resilience",
  "gratitude",
  "positivity",
  "adventure",
  "character",
  "service",
  "risk",
  "faith",
  "humility",
  "forgiveness",
  "curiosity",
  "simplicity",
  "effort",
  "trust",
  "change",
  "imagination",
  "balance",
  "joy",
  "self-awareness",
  "adaptability",
  "generosity",
  "determination",
  "respect",
  "listening",
  "lead by example",
  "humor in hardship",
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic) return;

    setIsLoading(true);
    try {
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = getQuotesByTopic(topic);
      setQuotes(result.map((q) => q.text));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Inspirational Quotes
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover wisdom on any topic that inspires you
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6 space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700"
            >
              Select a topic
            </label>
            <TopicSelector value={topic} onChange={setTopic} options={topics} />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!topic || isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              "Get Quotes"
            )}
          </Button>
        </form>

        <section className="space-y-4">
          {quotes.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800">
                Quotes about{" "}
                <span className="text-primary capitalize">{topic}</span>
              </h2>
              <div className="space-y-4">
                {quotes.map((quote, i) => (
                  <Card
                    key={i}
                    className="p-6 hover:shadow-md transition-shadow"
                  >
                    <blockquote className="text-lg italic text-gray-700">
                      &quot;{quote}&quot;
                    </blockquote>
                    <div className="mt-2 text-sm text-muted-foreground">
                      — Unknown
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : topic && !isLoading ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-muted-foreground">
                No quotes found for{" "}
                <strong className="text-primary">&quot;{topic}&quot;</strong>.
                Try another topic.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
