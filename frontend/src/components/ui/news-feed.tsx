"use client";

import React, { useEffect, useState } from "react";
import NewsCard from "./news-card";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
};

export const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchRSS = async () => {
      const res = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml",
      );
      const data = await res.json();
      setArticles(data.items.slice(0, 6));
    };
    fetchRSS();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </section>
  );
};

export default NewsFeed;
