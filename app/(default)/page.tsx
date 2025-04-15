export const metadata = {
  title: "Vigilance 360",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import HomeBlogSection from "@/components/home-blog-section";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      {/* Add Blog Section */}
      <Suspense fallback={<div className="flex justify-center py-16"><LoadingSpinner size="large" /></div>}>
        <HomeBlogSection />
      </Suspense>
      {/* <Testimonials /> */}
      <Cta />
    </>
  );
}
