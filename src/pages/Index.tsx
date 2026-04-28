import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import HeroSlider from "@/components/site/HeroSlider";
import TrustBar from "@/components/site/TrustBar";
import CategoryCards from "@/components/site/CategoryCards";
import OffersCarousel from "@/components/site/OffersCarousel";
import StatsSection from "@/components/site/StatsSection";
import SolarCalculator from "@/components/site/SolarCalculator";
import ProductTabs from "@/components/site/ProductTabs";
import FeaturedBanner from "@/components/site/FeaturedBanner";
import AikoVideos from "@/components/site/AikoVideos";
import Testimonials from "@/components/site/Testimonials";
import BrandsMarquee from "@/components/site/BrandsMarquee";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import LiveSalesToast from "@/components/site/LiveSalesToast";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <TrustBar />
        <CategoryCards />
        <OffersCarousel />
        <StatsSection />
        <SolarCalculator />
        <ProductTabs />
        <FeaturedBanner />
        <AikoVideos />
        <Testimonials />
        <BrandsMarquee />
        <Newsletter />
      </main>
      <Footer />
      <LiveSalesToast />
    </div>
  );
};

export default Index;
