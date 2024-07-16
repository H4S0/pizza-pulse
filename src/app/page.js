import Navbar from "@/components/Navbar";
import Hero from "./Hero";
import Menu from "./Menu";
export default function Home() {
  return (
    <section className="max-w-7xl mx-auto p-4">
      <Navbar />
      <Hero />
      <Menu/>
    </section>
  );
}
