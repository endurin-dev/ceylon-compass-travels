import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FleetSection from "@/components/FleetSection";
import TopJourneys from "@/components/TopJourneys";
import Reviews from "@/components/Reviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import Packages from "@/components/Packages";
import ReadyToBook from "@/components/ReadyToBook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero/>
<TrustBar/>
        <FleetSection />
        <TopJourneys />
        <WhyChooseUs />
      </main>
    </>
  );
}