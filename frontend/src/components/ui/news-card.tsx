import React from "react";
import Link from "next/link";

type Props = {
  article: {
    title: string;
    link: string;
    pubDate: string;
  };
};

const NewsCard: React.FC<Props> = ({ article }) => {
  return (
    <Link href={article.link} className="rounded-lg p-4 bg-accent-100 block">
      <p className="font-bold text-primary-200 hover:underline line-clamp-2 break-words">
        {article.title}
      </p>
      <p className="text-sm opacity-50 text-primary-200 truncate">
        {new Date(article.pubDate).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default NewsCard;
