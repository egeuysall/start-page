import React from "react";
import Link from "next/link";

type Props = {
  article: {
    title: string;
    link: string;
    pubDate: string;
    thumbnail?: string;
  };
};

const NewsCard: React.FC<Props> = ({ article }) => {
  return (
    <Link href={article.link} className="rounded-lg p-4 bg-accent-100">
      <p className="font-bold text-primary-200 hover:underline">
        {article.title.length > 32
          ? `${article.title.slice(0, 32).replace(/\s+$/, "")}...`
          : article.title}
      </p>
      <p className="text-sm opacity-50 text-primary-200">
        {new Date(article.pubDate).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default NewsCard;
