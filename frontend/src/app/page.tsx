import React from "react";
import { Clock } from "@/components/ui/clock";
import { Welcome } from "@/components/ui/welcome";
import { Link } from "@/components/ui/link";
import { Browser } from "@/components/ui/browser";

// Import the link data
import { links } from "@/lib/data";

const Home: React.FC = () => {
  return (
    <main className="w-full flex-center gap-4">
      <Clock />
      <Welcome />
      <Browser />
      <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {links.map((link) => {
          return <Link {...link} key={link.id} />;
        })}
      </section>
    </main>
  );
};

export default Home;
