import React from "react";
import { Clock } from "@/components/ui/clock";
import { Welcome } from "@/components/ui/welcome";
import { Link } from "@/components/ui/link";
import { Quotes } from "@/components/ui/quotes";

// Import the link data
import { links } from "@/lib/data";

const Home: React.FC = () => {
  return (
    <main className="w-full flex flex-col gap-2">
      <Clock />
      <Welcome />
      <Quotes />
      {links.map((link) => {
        return <Link {...link} key={link.id} />;
      })}
    </main>
  );
};

export default Home;
