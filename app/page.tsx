import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
  );
}
