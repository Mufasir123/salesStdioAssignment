'use client'
import Cards from "@/components/Cards";
import HeroSection from "@/components/Hero";
import { NavBarDemo } from "@/components/Navbar";


export default function Home() {
  return (
    <div>
      <NavBarDemo/>
      <div className="">
      <HeroSection/>
      </div>
      <Cards/>
    </div>
  );
}
