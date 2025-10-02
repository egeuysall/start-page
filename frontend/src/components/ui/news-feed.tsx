import React from "react";
import NewsCard from "./news-card";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
};

async function fetchNews(): Promise<Article[]> {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml",
      {
        next: { revalidate: 1800 },
      },
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.items.slice(0, 4);
  } catch {
    return [];
  }
}

export const NewsFeed: React.FC = async () => {
  const articles = await fetchNews();

  if (articles.length === 0) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <p className="opacity-50">Unable to load news feed.</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </section>
  );
};

export default NewsFeed;
