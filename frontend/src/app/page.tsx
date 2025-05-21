import React from "react";
import { Clock } from "@/components/ui/clock";
import { Welcome } from "@/components/ui/welcome";
import { Link } from "@/components/ui/link";
import { Quotes } from "@/components/ui/quotes";
import { Browser } from "@/components/ui/browser";

// Import the link data
import { links } from "@/lib/data";

const Home: React.FC = () => {
  return (
    <main className="w-full flex flex-col gap-2 flex-center">
      <Clock />
      <Welcome />
      <Quotes />
      <Browser />
      <section className="grid gap-2 grid-cols-3 md:grid-cols-6">
        {links.map((link) => {
          return <Link {...link} key={link.id} />;
        })}
      </section>
    </main>
  );
};

export default Home;
