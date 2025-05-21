import React from "react";

import { Clock } from "@/components/ui/clock";
import { Welcome } from "@/components/ui/welcome";
import { Link } from "@/components/ui/link";
import { Quotes } from "@/components/ui/quotes";
import { Browser } from "@/components/ui/browser";
import { Progress } from "@/components/ui/progress";
import { Weather } from "@/components/ui/weather";
import NewsFeed from "@/components/ui/news-feed";

import { links } from "@/lib/data";

const Home: React.FC = () => {
  return (
    <main className="w-full flex flex-col gap-4 flex-center">
      <Progress />
      <div className="flex-center gap-2">
        <Clock />
        <Weather />
      </div>
      <Welcome />
      <Quotes />
      <h5 className="text-left w-full">Search Google</h5>
      <Browser />
      <h5 className="text-left w-full">Links</h5>
      <section className="grid w-full gap-4 grid-cols-3 md:grid-cols-6">
        {links.map((link) => (
          <Link {...link} key={link.id} />
        ))}
      </section>
      <h5 className="text-left w-full">The feed</h5>
      <NewsFeed />
      <h5 className="text-left w-full">Code</h5>
      <img
        src="https://github-readme-stats.hackclub.dev/api/wakatime?username=2553&api_domain=hackatime.hackclub.com&theme=transparent&custom_title=Stats&layout=compact&cache_seconds=0&langs_count=6"
        alt="Hackatime Stats"
        className="w-full"
      />
    </main>
  );
};

export default Home;
